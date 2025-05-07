import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../styles/BoothInfo.module.css";
import Footer from "../../components/Footer";
import { boothsData } from "../../assets/json/booths";

function BoothInfo() {
  const [booth, setBooth] = useState(boothsData[0]);
  const navigate = useNavigate();

  if (!booth)
    return <div>해당 부스의 정보가 아직 업데이트되지 않았습니다.</div>;

  return (
    <div className={style.body}>
      <div className={style.header}>
        <img
          src="/images/backButton.png"
          className={style.back}
          onClick={() => navigate(-1)}
          alt="뒤로 가기"
        />
        <img src="/images/logo.svg" className={style.logo} />
      </div>
      <img src={booth.img} className={style.boothImg} />
      <div className={style.boothInfo}>
        <div>
          <h1 className={style.name}>{booth.name}</h1>
          <p className={style.type}>{booth.type.join(" | ")}</p>
        </div>
        <div className={style.member}>
          <p>
            <span className="dept">개발자</span> {booth.developer.join(", ")}
          </p>
          <p>
            <span className="dept">디자이너</span> {booth.designer.join(", ")}
          </p>
        </div>
        <p className={style.comment}>{booth.comment}</p>
        <button className={style.nuto} onClick={() => navigate("/nuto")}>
          토마토 남기기
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default BoothInfo;
