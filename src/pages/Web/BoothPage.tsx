import React from "react";
import Board from "../../components/Board";
import style from "../../styles/BoothPage.module.css";
import { boothsData } from "../../assets/json/booths";
import { useNavigate } from "react-router-dom";

function BoothPage() {
  const navigate = useNavigate();
  const handleClick = (route: string) => {
    navigate(route);
  };
  return (
    <div className={style.boothPageContainer}>
      <header className={style.nutoHeader}>
        <img
          src="/images/logo.svg"
          alt="로고"
          width={203}
          height={44}
          style={{ marginTop: "5px" }}
          onClick={() => handleClick("/nuto-garden")}
        />
        <span>
          <span
            onClick={() => handleClick("/nuto-garden")}
            className={style.goBooth}
          >
            응원 토마토 남기기
          </span>
        </span>
      </header>
      <img
        src="/images/Garden.jpg"
        alt="QR"
        style={{ width: "100vw", height: "100vh", scrollBehavior: "smooth" }}
      />
      <div className={style.boothContainer}>
        {boothsData.map((booth, index) => {
          return (
            <Board
              booth={booth}
              width={300}
              fontSize={16}
              bottom={13}
              logoWidth={112}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BoothPage;
