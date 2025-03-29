import React, { useState, useEffect } from "react";
import style from "../styles/NutoPage.module.css";
import Footer from "../components/Footer";
import { boothsData } from "../assets/json/booths";

function NutoPage() {
    const [booth, setBooth] = useState(boothsData[0]);

    if (!booth) return <div>해당 부스의 정보가 아직 업데이트되지 않았습니다.</div>;

    return (
        <div className={style.body}>
            <img src='/images/logo.svg' className={style.logo} />
            <div className={style.profile}>

            </div>
            <img src={booth.img} className={style.boothImg} />
            <div className={style.boothInfo}>
                <h1 className={style.name}>{booth.name}</h1>
                <p className={style.type}>{booth.type.join(" | ")}</p>
                <div className={style.member}>
                    <p><span className="dept">개발자</span> {booth.developer.join(", ")}</p>
                    <p><span className="dept">디자이너</span> {booth.designer.join(", ")}</p>
                </div>
                <p className={style.comment}>{booth.comment}</p>
            </div>
            <Footer />
        </div>
    );
}

export default NutoPage;