import style from "../styles/Footer.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Footer({}) {
  const navigate = useNavigate();

  const [clickedButton, setClickedButton] = useState(0);
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
  const footerIconName = ["홈", "게시물 추가", "부스 소개", "Nuto"];

  const clickFooter = (idx: number) => {
    setClickedButton(idx);
  };

  useEffect(() => {
    switch(clickedButton){
      case 0:
        navigate('/home');
    }
  }, [clickedButton])

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
