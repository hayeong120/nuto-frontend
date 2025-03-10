import { useNavigate } from "react-router-dom";
import style from "../styles/Header.module.css";

function Header(props: {
  prevSrc: string;
  nextSrc: string;
  saveImage?: () => void;
}) {
  const navigate = useNavigate();
  const headerImages = ["/images/backButton", "/images/checkButton"];

  const returnBack = () => {
    if (props.prevSrc === "-1") {
      navigate(-1);
    } else {
      navigate(props.prevSrc);
    }
  };

  const moveNext = () => {
    if (props.saveImage) {
      props.saveImage();
    }
    navigate(props.nextSrc);
  };

  return (
    <div className={style.Header}>
      {headerImages.map((headerImage, idx) => {
        return (
          <div key={idx} onClick={idx === 0 ? returnBack : moveNext}>
            <img
              className={idx === 0 ? style.HeaderBackImg : style.HeaderNextImg}
              src={`${headerImage}.png`}
              alt={`${idx}번째 요소`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Header;
