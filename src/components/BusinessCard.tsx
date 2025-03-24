import style from "../styles/BusinessCard.module.css";
import { useState } from "react";

function BusinessCard(props: {
  profile: {
    name: string;
    type: string;
    img: string;
    introduce: string;
    skills: string[];
  };
}) {
  const imgs = ["/images/downArrow.png", "/images/upArrow.png"];
  const [toggle, setToggle] = useState(false);

  return (
    <div className={style.BusinessCard}>
      <div
        className={style["toggle-container"]}
        onClick={() => setToggle(!toggle)}
      >
        <p>{props.profile.introduce}</p>
        <img src={toggle ? imgs[1] : imgs[0]} alt="toggle" />
      </div>
      <div className={`${style["member-info"]} ${toggle ? style.open : ""}`}>
        <div className={style["member-info-container"]}>
          <img src={props.profile.img} alt={props.profile.name} />
          <div className={style["member-infos"]}>
            <p>{props.profile.name}</p>
            <p>{props.profile.type}</p>
          </div>
        </div>
        <div className={style["skill-set-container"]}>
          <p>기술스택</p>
          <div className={style["skill-set"]}>
            {props.profile.skills.map((skill, index) => (
              <p key={index}>{skill}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessCard;
