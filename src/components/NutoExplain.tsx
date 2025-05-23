import React, { useState } from "react";
import style from "../styles/NutoExplain.module.css";
import Footer from "./Footer";
import { boothsData } from "../assets/json/booths";

function NutoPage() {
  const [booth] = useState(boothsData[0]);

  if (!booth)
    return <div>해당 부스의 정보가 아직 업데이트되지 않았습니다.</div>;

  return (
    <div className={style.body}>
      <img alt="boothImg" src={booth.img} className={style.boothImg} />
      <div className={style.boothInfo}>
        <h1 className={style.name}>{booth.name}</h1>
        <p className={style.type}>{booth.type.join(" | ")}</p>
        <div className={style.member}>
          <p>
            <span className={style.dept}>개발자 </span>
            {" | "}
            {booth.developer.join(", ")}
          </p>
          <p>
            <span className={style.dept}>디자이너</span>
            {" | "}
            {booth.designer.join(", ")}
          </p>
        </div>
        <p className={style.comment}>{booth.comment}</p>
      </div>
      <Footer />
    </div>
  );
}

export default NutoPage;
