import { useNavigate } from "react-router-dom";
import style from "../styles/Header.module.css";

function Header({}) {
  const navigate = useNavigate();
  const headerImages = ["/images/backButton", "/images/checkButton"];

  const returnBack = () => {
    navigate(-1);
  };

  const moveNext = () => {
    navigate("/edit");
  };

  return (
    <div className={style.Header}>
      {headerImages.map((headerImage, idx) => {
        return (
          <div onClick={idx === 0 ? returnBack : moveNext}>
            <img
              className={style.HeaderImg}
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
