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
  const [framedPhoto, setFramedPhoto] = useState<string | null>(null);

  const deleteIcon = "/images/Delete.png";
  var deleteImg = document.createElement("img");
  deleteImg.src = deleteIcon;

  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerColor = "black";
  fabric.Object.prototype.cornerStyle = "circle";

  const stickers = [
    "/images/물주전자.png",
    "/images/꽃.png",
    "/images/해.png",
    "/images/구름캐릭.png",
    "/images/풀떼기.png",
    "/images/무당벌레.png",
    "/images/나무.png",
    "/images/아이디어.png",
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 358,
      height: 420,
    });

    const rect = new fabric.Rect({
      left: 0,
      top: 0,
      fill: "white",
      width: 358,
      height: 420,
      selectable: false,
    });

    newCanvas.add(rect);

    if (image) {
      const img = new Image();
      img.src = image;

      img.onload = () => {
        const scaleX = 314 / img.width;
        const scaleY = 314 / img.height;

        const imgObj = new fabric.FabricImage(img, {
          left: 22,
          top: 22,
          selectable: false,
        });

        imgObj.set({
          scaleX: scaleX,
          scaleY: scaleY,
          width: img.width,
          height: img.height,
        });

        imgObj.controls.deleteControl = new fabric.Control({
          x: 0.5,
          y: -0.5,
          offsetY: 16,
          cursorStyle: "pointer",
          mouseUpHandler: deleteObject,
          render: renderIcon,
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

  const add = (idx: number) => {
    const stickerImg = new Image();
    stickerImg.src = stickers[idx];
    stickerImg.onload = () => {
      const scaleX = 70 / stickerImg.width;
      const scaleY = 70 / stickerImg.height;
      if (fabricCanvas) {
        const imgObj = new fabric.Image(stickerImg, {
          left: 50,
          top: 50,
          selectable: true,
        });

        imgObj.set({
          scaleX: scaleX,
          scaleY: scaleY,
          width: stickerImg.width,
          height: stickerImg.height,
        });

        imgObj.controls.deleteControl = new fabric.Control({
          x: 0.5,
          y: -0.7,
          offsetY: 16,
          cursorStyle: "pointer",
          mouseUpHandler: deleteObject,
          render: renderIcon,
        });

        fabricCanvas.add(imgObj);
        fabricCanvas.renderAll();
        setFramedPhoto(
          fabricCanvas.toDataURL({ format: "png", multiplier: 10 })
        );
      }
    };
  };

  function deleteObject(_eventData: any, transform: any) {
    const canvas = transform.target.canvas;
    canvas.remove(transform.target);
    canvas.requestRenderAll();
  }

  function renderIcon(
    ctx: any,
    left: any,
    top: any,
    _styleOverride: any,
    fabricObject: any
  ) {
    const size = 24;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  const downloadFile = () => {
    if (!framedPhoto) return;
    const a = document.createElement("a");
    a.href = framedPhoto;
    a.download = "framed_photo.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className={def.Body}>
      <Header prevSrc="-1" nextSrc="/nuto" />
      <div className={style.EditPostContainer}>
        <p>폴라로이드를 취향에 맞게 꾸며주세요!</p>
        <canvas ref={canvasRef} id="canvas"></canvas>
        <div className={style.stickerContainer}>
          {stickers.map((sticker: string, idx: number) => {
            return (
              <button key={idx} onClick={() => add(idx)}>
                <img src={sticker} alt={sticker} />
              </button>
            );
          })}
        </div>

        {/* <button onClick={downloadFile}>다운로드</button> */}
      </div>
      <div className={style.background}></div>

      <Footer />
    </div>
  );
}

export default EditPost;
