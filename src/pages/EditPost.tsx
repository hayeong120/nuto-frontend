import { useImage } from "../context/ImageContext";
import def from "../styles/Default.module.css";
import { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import style from "../styles/EditPost.module.css";
import * as fabric from "fabric";

function EditPost() {
  const { image } = useImage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 343,
      height: 450,
    });

    const rect = new fabric.Rect({
      left: 0,
      top: 0,
      fill: "white",
      width: 343,
      height: 450,
      selectable: false,
    });

    newCanvas.add(rect);

    if (image) {
      const img = new Image();
      img.src = image;

      img.onload = () => {
        const imgObj = new fabric.Image(img, {
          left: 22,
          top: 22,
          selectable: false,
        });

        const scaleX = 300 / img.width;
        const scaleY = 300 / img.height;

        imgObj.set({
          scaleX: scaleX,
          scaleY: scaleY,
          width: img.width,
          height: img.height,
        });

        newCanvas.add(imgObj);
        newCanvas.renderAll();
      };
    }

    setFabricCanvas(newCanvas);

    return () => {
      newCanvas.dispose();
    };
  }, [image]);

  return (
    <div className={def.Body}>
      <Header prevSrc="-1" nextSrc="/nuto" />
      <div className={style.EditPostContainer}>
        <p>폴라로이드를 취향에 맞게 꾸며주세요!</p>
        <canvas ref={canvasRef} id="canvas"></canvas>
      </div>
      <Footer />
    </div>
  );
}

export default EditPost;
