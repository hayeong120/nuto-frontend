import React, { useState, useEffect } from "react";
import style from "../../styles/Booths.module.css";
import Board from "../../components/Board";
import axios from "axios";
import Footer from "../../components/Footer";

interface Booth {
  booth_id: string;
  members: string[];
  s3_path: string;
}

function Booths() {
  const [booths, setBooths] = useState<Booth[]>([]);

  const fetchBooths = async () => {
    try {
      const response = await axios.get<Booth[]>(
        `${process.env.NUTO_ROUTE}/api/booth`
      );
      setBooths(response.data);
    } catch (err) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchBooths();
  }, []);

  return (
    <div
      style={{ backgroundImage: "url(/images/boothsBackground.png)" }}
      className={style.body}
    >
      <p className={style.text}>다양한 부스들이 있는 텃밭을 구경해보세요!</p>
      <div className={style.boardContainer}>
        {booths.length > 0 ? (
          booths.map((booth, index) => <Board key={index} booth={booth} />)
        ) : (
          <p>등록된 부스가 없습니다.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Booths;
