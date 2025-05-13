import React, { useState } from "react";
import BusinessCard from "../../components/BusinessCard";
import Members from "../../components/Members";
import { profiles } from "../../assets/json/profiles";
import style from "../../styles/Chat.module.css";
import Footer from "../../components/Footer";
import Chatting from "../../components/Chatting";
import axios from "axios";

type defaultChat = {
  type: "default-chat";
  data: {
    name: string;
    comment: string;
    img: string;
  };
};

type userChat = {
  type: "user-chat";
  data: {
    comment: string;
  };
};

function Chat() {
  const [profile, setProfile] = useState(profiles[0]);
  const [message, setMessage] = useState("");
  const [chattings, setChattings] = useState<(defaultChat | userChat)[]>([
    {
      type: "default-chat",
      data: {
        name: profile.name,
        comment: profile.comment,
        img: profile.img,
      },
    },
  ]);
  const changeMember = (idx: number) => {
    const changeDefaultChat: defaultChat = {
      type: "default-chat",
      data: {
        name: profiles[idx].name,
        comment: profiles[idx].comment,
        img: profiles[idx].img,
      },
    };

    setChattings([changeDefaultChat]);
    setProfile(profiles[idx]);
  };

  const inputedMessage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const chkText = async (text: string) => {
      text = text.replace(/\n/g, " ");

      const response = await axios.post(
        "https://nuto.mirim-it-show.site/check",
        {
          text: text,
        }
      );

      return response.data.label;
    };

    const able = await chkText(message);

    const negativeEmotions = [
      "anger",
      "annoyance",
      "confusion",
      "disappointment",
      "disapproval",
      "disgust",
      "embarrassment",
      "fear",
      "grief",
      "nervousness",
      "realization",
      "remorse",
      "sadness",
      "surprise",
    ];

    console.log(able);

    if (!negativeEmotions.includes(able.label)) {
      const newChatting: userChat = {
        type: "user-chat",
        data: { comment: message },
      };

      await axios.post(`https://nuto.mirim-it-show.site/message`, {
        name: profile.name,
        message: message,
      });

      await axios.post(`https://nuto.mirim-it-show.site/message/email`, {
        to: profile.email,
        content: message,
      });

      setChattings([...chattings, newChatting]);
    } else {
      alert("부정적인 내용의 메시지는 보낼 수 없습니다.");
    }
    setMessage("");
  };

  return (
    <div className={style.Body}>
      <img alt="logo" src="/images/logo.svg" className={style.logo} />
      <Members type="send" profiles={profiles} changeMember={changeMember} />
      <BusinessCard profile={profile} />

      <Chatting chattings={chattings} />

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
