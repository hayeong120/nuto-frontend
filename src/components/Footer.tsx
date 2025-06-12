import style from "../styles/Footer.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const [clickedButton, setClickedButton] = useState(
    parseInt(sessionStorage.getItem("footerIdx") ?? "0")
  );
  const navigate = useNavigate();
  const footerButtons = [
    "/images/homeButton.png",
    "/images/postButton.png",
    "/images/boothButton.png",
    "/images/nutoButton.png",
  ];
  const footerClickedButtons = [
    "/images/clickedHomeButton.png",
    "/images/clickedPostButton.png",
    "/images/clickedBoothButton.png",
    "/images/clickedNutoButton.png",
  ];
  const footerIconName = ["홈", "업로드", "부스 소개", "Nuto"];
  const footerRouter = ["/home", "/search", "/booths", "/members"];

  const clickFooter = (idx: number) => {
    setClickedButton(idx);
    sessionStorage.setItem("footerIdx", idx.toString());
    navigate(footerRouter[idx]);
  };

  return (
    <div className={style.Footer}>
      {footerButtons.map((footerButton, idx) => {
        return (
          <div
            key={idx}
            className={style.FooterIconContainer}
            onClick={() => clickFooter(idx)}
          >
            <img
              src={
                clickedButton === idx ? footerClickedButtons[idx] : footerButton
              }
              alt={footerIconName[idx]}
            />
            <p style={{ color: clickedButton === idx ? "#656565" : "#b5b5b5" }}>
              {footerIconName[idx]}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Footer;
