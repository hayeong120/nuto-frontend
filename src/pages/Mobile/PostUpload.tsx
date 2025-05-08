import Header from "../../components/Header";
import Footer from "../../components/Footer";
import def from "../../styles/Default.module.css";
import style from "../../styles/PostUpload.module.css";
import { useRef, useState } from "react";
import { useImage } from "../../context/ImageContext";
import { usePostInfo } from "../../context/PostInfoContext";
import { useLocation } from "react-router-dom";

function PostUpload() {
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const { image, setImage } = useImage();
  const { name, setName } = usePostInfo();
  const location = useLocation();
  const booth = location.state;
  console.log(booth);

  const uploadImage = () => {
    if (imgRef.current) {
      imgRef.current.click();
    }
  };

  const showPreview = async () => {
    if (imgRef.current && imgRef.current.files) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          setPreviewImage(reader.result as string);
          setImage(reader.result as string);
        }
      };
    }
  };

  const onChange = (event: any) => {
    setName(event.target.value);
  };

  return (
    <div className={def.Body}>
      <Header prevSrc="-1" nextSrc="/edit" />
      <div className={style.BoothContainer}>
        <p>선택한 부스</p>
      </div>
      <div className={style.NameContainer}>
        <p>당신의 이름은 무엇인가요?</p>
        <input onChange={onChange} value={name} />
      </div>
      <div className={style.ImageContainer}>
        <p>폴라로이드에 첨부할 사진을 선택해주세요.</p>

        <div className={style.InputImage}>
          <button onClick={uploadImage}>+</button>

          <input
            type="file"
            ref={imgRef}
            onChange={showPreview}
            accept=".png, .jpg, .jpeg"
            style={{ display: "none" }}
          />

          <img className={style.InputedImage} src={image} alt={previewImage} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PostUpload;
