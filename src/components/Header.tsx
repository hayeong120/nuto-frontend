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
    if (props.nextSrc) {
      navigate(props.nextSrc);
    }
  };

  return (
    <div className={style.Header}>
      <div key={0} onClick={returnBack}>
        <img
          className={style.HeaderBackImg}
          src={`${headerImages[0]}.png`}
          alt={`${0}번째 요소`}
        />
      </div>

      {props.nextSrc !== "-1" && (
        <div key={1} onClick={moveNext}>
          <img
            className={style.HeaderBackImg}
            src={`${headerImages[1]}.png`}
            alt={`${1}번째 요소`}
          />
        </div>
      )}
    </div>
  );
}

export default Header;
