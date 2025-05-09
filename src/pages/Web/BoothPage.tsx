import React from "react";
import Board from "../../components/Board";
import style from "../../styles/BoothPage.module.css";
import { boothsData } from "../../assets/json/booths";
import { useNavigate } from "react-router-dom";

function BoothPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
    console.log("응원 토마토 남기기");
  };
  return (
    <div className={style.boothPageContainer}>
      <button onClick={handleClick}>응원 토마토 남기기</button>
      <div className={style.boothContainer}>
        {boothsData.map((booth, index) => {
          return <Board booth={booth} />;
        })}
      </div>
    </div>
  );
}

export default BoothPage;
