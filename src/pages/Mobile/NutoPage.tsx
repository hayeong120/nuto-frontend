import React, { useState } from "react";
import style from "../../styles/NutoPage.module.css";
import Footer from "../../components/Footer";
import Members from "../../components/Members";
import { boothsData } from "../../assets/json/booths";
import { profiles } from "../../assets/json/profiles";

function NutoPage() {
  const [booth, setBooth] = useState(boothsData[0]);
  const [profile, setProfile] = useState(profiles[0]);
  // 멤버 변경 함수
  const changeMember = (idx: number) => {
    setProfile(profiles[idx]);
  };

  if (!booth)
    return <div>해당 부스의 정보가 아직 업데이트되지 않았습니다.</div>;

  return (
    <div className={style.body}>
      <img alt="logo" src="/images/logo.svg" className={style.logo} />
      <div className={style.profileSection}>
        <Members type="send" profiles={profiles} changeMember={changeMember} />
      </div>
      <img alt="boothImg" src={booth.img} className={style.boothImg} />
      <div className={style.boothInfo}>
        <h1 className={style.name}>{booth.name}</h1>
        <p className={style.type}>{booth.type.join(" | ")}</p>
        <div className={style.member}>
          <p>
            <span className="dept">개발자</span> {booth.developer.join(", ")}
          </p>
          <p>
            <span className="dept">디자이너</span> {booth.designer.join(", ")}
          </p>
        </div>
        <p className={style.comment}>{booth.comment}</p>
      </div>
      <Footer />
    </div>
  );
}

export default NutoPage;
