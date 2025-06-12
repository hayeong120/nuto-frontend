import React from "react";
import style from "../styles/Booth.module.css";
import { useNavigate } from "react-router-dom";

interface BoothProps {
  booth: {
    booth_id: string;
    members: string[];
    s3_path: string;
  };
  navi: {
    go: boolean;
    path?: string;
  };
  boardStyle?: {
    logoWidth: number;
    bottom: number;
    fontSize: number;
  };
}

const Booth: React.FC<BoothProps> = ({ booth, navi, boardStyle }) => {
  const navigate = useNavigate();
  const memberName = (names: string[]): string => {
    let nameString = "";
    names.forEach((name, i) => {
      if (i === names.length - 1) {
        nameString += name;
      } else {
        nameString += `${name}, `;
      }
    });
    return nameString;
  };
  const goPost = (booth: string) => {
    if (navi.go) {
      navigate(`/${navi.path}`, { state: booth });
    }
  };

  return (
    <div
      className={style.boothContainer}
      onClick={() => goPost(booth.booth_id)}
    >
      <img
        src={`/images/booths/${booth.booth_id}.png`}
        alt="부스 이미지"
        className={style.boothImg}
      />
      <div className={style.gradient} />
      <div
        className={style.boothInfo}
        style={{ bottom: boardStyle.bottom || 8 }}
      >
        <img
          src="/images/boothName.svg"
          alt="부스 이름"
          className={style.boothName}
          style={{ width: boardStyle.logoWidth }}
        />
        <p
          className={style.memberName}
          style={{ fontSize: boardStyle.fontSize }}
        >
          {memberName(booth.members)}
        </p>
      </div>
    </div>
  );
};

export default Booth;
