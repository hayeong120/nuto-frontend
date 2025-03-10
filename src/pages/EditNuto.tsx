import def from "../styles/Default.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import style from "../styles/EditNuto.module.css";
import { useRef, useState, useEffect } from "react";
import * as fabric from "fabric";
import { usePolariod } from "../context/PolariodContext";
import axios from "axios";

function EditNuto() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imgSrc, setImgSrc] = useState<string>("/images/redTomato.png");
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
    };

    return () => {
      newCanvas.dispose();
    };
  }, [imgSrc]);

  const changeFrame = (idx: number) => {
    setImgSrc(tomatos[idx]["src"]);
  };

  return (
    <div className={def.Body}>
      <Header prevSrc="-1" nextSrc="/" />
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
