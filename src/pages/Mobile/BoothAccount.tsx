import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import def from "../../styles/Default.module.css";
import { useParams } from "react-router-dom";
import { boothsData } from "../../assets/json/booths";
import BoothCategory from "../../components/BoothCategory";

function BoothAccount() {
  const boothId = useParams().boothId;
  const selectedBooth = boothsData.filter(
    (booth) => booth.booth_id === boothId
  )[0];
  const [type, setType] = useState<"nuto" | "polariod">("polariod");

  return (
    <div className={def.Body}>
      <Header prevSrc={`/booths/${boothId}`} nextSrc="-1" />
      <div>
        <img src={selectedBooth.img} alt={selectedBooth.img} />
        <div>
          <p>{}</p>
          <p>게시글</p>
        </div>
      </div>
      <p>{selectedBooth.name}</p>
      <p>{selectedBooth.type}</p>
      <button>소개</button>
      <div>
        {/* 카테고리 선택 */}
        <div>
          <button onClick={() => setType("polariod")}>폴라로이드</button>
          <button onClick={() => setType("nuto")}>토마토</button>
        </div>
        <BoothCategory type={type} boothId={boothId} />
      </div>
      <Footer />
    </div>
  );
}

export default BoothAccount;
