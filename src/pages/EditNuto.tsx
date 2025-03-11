import def from "../styles/Default.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import style from "../styles/EditNuto.module.css";
import { useRef, useState, useEffect } from "react";
import * as fabric from "fabric";
import { usePolariod } from "../context/PostContext";
import axios from "axios";
import bcrypt from "bcryptjs";

function EditNuto() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [imgSrc, setImgSrc] = useState<string>("/images/redTomato.png");
  const { nutoFile, setNutoFile } = usePolariod();
  const { polariodFile, setPolariodFile } = usePolariod();
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
    };

    return () => {
      newCanvas.dispose();
    };
  }, [imgSrc]);

  const changeFrame = (idx: number) => {
    setImgSrc(tomatos[idx]["src"]);
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

    console.log(file, polariodFile);

    console.log("FormData 내용:");

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/post",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("업로드 성공:", response);
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
        <canvas ref={canvasRef} id="canvas" className={style.NutoCanvas} />
      </div>
      <div className={style.background}></div>
      <Footer />
    </div>
  );
}

export default EditNuto;
