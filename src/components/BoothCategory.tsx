import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../styles/BoothCategory.module.css";

type dataType = {
  createdAt: string;
  location: string;
  name: string;
  nutoImage: string;
  password: string;
  polariodImage: string;
  s;
  updatedAt: string;
  _id: string;
};

function BoothCategory(props: { type: string; boothId: string }) {
  const [datas, setDatas] = useState<dataType[] | null>(null);
  useEffect(() => {
    const getPolariod = async () => {
      const response = await axios.get(
        `https://nuto.mirim-it-show.site/post/nuto-garden/${props.boothId}`
      );
      setDatas(response.data.data);
      console.log(response);
    };

    getPolariod();
  }, []);

  return (
    <div className={style.dataContainer}>
      {datas &&
        datas.map((data) => {
          return (
            <img
              src={
                props.type === "polariod" ? data.polariodImage : data.nutoImage
              }
              alt={data.createdAt}
            />
          );
        })}
    </div>
  );
}

export default BoothCategory;
