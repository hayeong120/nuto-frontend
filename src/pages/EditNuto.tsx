import def from "../styles/Default.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import style from "../styles/EditNuto.module.css";
import { useRef, useState, useEffect } from "react";
import * as fabric from "fabric";
import { usePolariod } from "../context/PostContext";
import { usePostInfo } from "../context/PostInfoContext";
import { useImage } from "../context/ImageContext";
import axios from "axios";
import bcrypt from "bcryptjs";

function EditNuto() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [imgSrc, setImgSrc] = useState<string>("/images/redTomato.png");
  const { location, setLocation } = usePostInfo();
  const { name, setName } = usePostInfo();
  const { nutoFile, setNutoFile } = usePolariod();
  const { polariodFile, setPolariodFile } = usePolariod();
  const { image, setImage } = useImage();
  const API_KEY = process.env.REACT_APP_HUGGING_FACE_API_KEY;

  const tomatos = [
    { src: "/images/redTomato.png", comment: "최고였다는 극찬" },
    { src: "/images/orangeTomato.png", comment: "신선한 아이디어" },
    { src: "/images/greenTomato.png", comment: "따뜻한 응원" },
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 358,
      height: 343,
    });

    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      const scaleX = 358 / img.width;
      const scaleY = 278 / img.height;

      const imgObj = new fabric.FabricImage(img, {
        top: 36,
        left: 0,
        selectable: false,
      });

      imgObj.set({
        scaleX: scaleX,
        scaleY: scaleY,
        width: img.width,
        height: img.height,
      });

      const textBox = new fabric.IText("응원글을\n입력해 주세요.", {
        fontSize: 16,
        fontFamily: "Ownglyph PDH",
        fill: "white",
        textAlign: "center",
        top: 139,
        left: 125,
        // txtAlign: CENTER,
      });

      newCanvas.add(imgObj);
      newCanvas.add(textBox);
      newCanvas.renderAll();
      setFabricCanvas(newCanvas);
      fabricCanvas?.renderAll();
    };

    return () => {
      newCanvas.dispose();
    };
  }, [imgSrc]);

  const changeFrame = (idx: number) => {
    setImgSrc(tomatos[idx]["src"]);
  };

  const chkText = async (text: string) => {
    text = text.replace(/\n/g, " ");

    const response = await axios.post("http://localhost:3000/check", {
      text: text,
    });

    // response.data가 문자열일 경우 JSON 객체로 변환
    const data = { inputs: response.data };

    console.log(await available_check(data));
  };

  const available_check = async (data: object) => {
    console.log(
      "HUGGING_FACE_API_KEY:",
      process.env.REACT_APP_HUGGING_FACE_API_KEY
    );

    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data), // JSON 형식으로 변환
      }
    );
    const result = await response.json();
    return result;
  };

  const dataURLtoFile = (dataURL: string, filename: string) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const hashing = async (password: string) => {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    return await bcrypt.hash(password, salt);
  };

  const setPolariodImage = async () => {
    if (!fabricCanvas) return;

    const dataURL = fabricCanvas.toDataURL({ format: "png", multiplier: 4 });
    const file = dataURLtoFile(dataURL, "nuto.png");

    const objects = fabricCanvas.getObjects();
    const textObject = objects.find((obj) => obj.type === "i-text");
    const text = (textObject as fabric.IText).text;
    console.log(text);
    await chkText(text);

    const password = prompt("비밀번호를 입력하세요.");
    if (!password) {
      alert("비밀번호를 입력해야 합니다.");
      return;
    }

    const hashedPassword = await hashing(password);

    const formData = new FormData();
    formData.append("nutoImage", file); // `file`을 `nutoImage`로 저장
    if (polariodFile) {
      formData.append("polariodImage", polariodFile); // `polariodImage` 추가
    }

    formData.append("name", "오지은");
    formData.append("location", "nuto");
    formData.append("password", hashedPassword);

    try {
      const response = await axios.post(
        "http://localhost:3000/post",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("업로드 성공:", response);
      setLocation("");
      setName("");
      setNutoFile(null);
      setPolariodFile(null);
      setImage("");
    } catch (err) {
      console.error("업로드 실패:", err);
    }
  };

  return (
    <div className={def.Body}>
      <Header prevSrc="-1" nextSrc="/" saveImage={setPolariodImage} />
      <div className={style.NutoContainer}>
        <p>토마토를 선택해 주세요.</p>
        <div className={style.ChooseTomatoContainer}>
          {tomatos.map((tomato, idx: number) => {
            return (
              <div
                className={style.TomatoDiv}
                onClick={() => changeFrame(idx)}
                key={idx}
              >
                <img
                  src={tomato.src}
                  alt={tomato.comment}
                  style={{ width: 98, height: 76 }}
                />
                <p>{tomato.comment}</p>
              </div>
            );
          })}
        </div>
        <input />
        <div className={style.canvasContainer}>
          <canvas ref={canvasRef} id="canvas" className={style.NutoCanvas} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditNuto;
