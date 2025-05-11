import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Booth from "../../components/Booth";
import style from "../../styles/Search.module.css";
import api from "../../api/axios";

interface BoothType {
  booth_id: string;
  members: string[];
  s3_path: string;
}

function Search() {
  const [booths, setBooths] = useState<BoothType[]>([]);
  const [inputText, setInputText] = useState("");

  const fetchBooths = async (name: string) => {
    try {
      const booth = name.trim() || "";
      const response = await api.get(`/booth/${booth}`);
      setBooths(response.data);
      console.log(booths);
    } catch (err) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={style.body}>
      <p className={style.text}>어느부스에 토마토를 남길까요?</p>
      <div className={style.searchContainer}>
        <input
          type="text"
          className={style.searchInput}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchBooths(inputText);
            }
          }}
        />
        <img
          src="/images/searchIcon.png"
          alt="Search Icon"
          className={style.searchIcon}
          onClick={() => fetchBooths(inputText)}
        />
        <img
          alt="Search Underbar"
          src="/images/searchUnderbar.png"
          className={style.searchUnderbar}
        />
      </div>
      <div className={style.boothContainer}>
        {booths.length > 0 ? (
          booths.map((booth, index) => (
            <div style={{ borderRadius: "10px", overflow: "hidden" }}>
              <Booth
                key={index}
                booth={booth}
                navi={{ go: true, path: "post" }}
              />
            </div>
          ))
        ) : (
          <p className={style.noBooth}>부스가 없습니다.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Search;
