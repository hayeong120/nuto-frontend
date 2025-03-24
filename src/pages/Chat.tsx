import React, { useState } from "react";
import BusinessCard from "../components/BusinessCard";
import def from "../styles/Default.module.css";
import Members from "../components/Members";
import { profiles } from "../assets/json/profiles";
import style from "../styles/Chat.module.css";
import DefaultChat from "../components/DefaultChat";
import SendChat from "../components/SendChat";
import Footer from "../components/Footer";

function Chat({}) {
  const [profile, setProfile] = useState(profiles[0]);
  const [message, setMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const changeMember = (idx: number) => {
    setProfile(profiles[idx]);
  };

  const inputedMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    setInputMessage(message);
    setMessage("");
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

      {inputMessage ? <SendChat comment={inputMessage} /> : ""}

      <div className={style["message-container"]}>
        <div className={style["input-container"]}>
          <input
            placeholder="텍스트 입력"
            value={message}
            onChange={inputedMessage}
          />
        </div>
        <img
          src="/images/sendButton.png"
          alt="sendButton"
          onClick={sendMessage}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Chat;
