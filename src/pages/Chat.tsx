import React, { useState } from "react";
import BusinessCard from "../components/BusinessCard";
import def from "../styles/Default.module.css";
import Members from "../components/Members";
import { profiles } from "../assets/json/profiles";
import style from "../styles/Chat.module.css";
import DefaultChat from "../components/DefaultChat";

function Chat({}) {
  const [profile, setProfile] = useState(profiles[0]);
  const changeMember = (idx: number) => {
    setProfile(profiles[idx]);
  };
  return (
    <div className={def.Body}>
      <Members profiles={profiles} changeMember={changeMember} />
      <BusinessCard profile={profile} />
      <DefaultChat
        name={profile.name}
        comment={profile.comment}
        img={profile.img}
      />
    </div>
  );
}

export default Chat;
