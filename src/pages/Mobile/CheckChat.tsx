import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Members from "../../components/Members";
import Chatting from "../../components/Chatting";
import style from "../../styles/Chat.module.css";
import { profiles } from "../../assets/json/profiles";
import axios from "axios";

type checkChat = {
  type: "check-chat";
  data: {
    name: string;
    comment: string;
  };
};

type chat = {
  _id: string;
  name: string;
  message: string;
  cratedAt: string;
  updatedAt: string;
};

function CheckChat() {
  const [profile, setProfile] = useState(profiles[0]);
  const [chattings, setChattings] = useState<checkChat[]>([]);
  console.log("member : ", profile);
  console.log(profile.name, profiles);

  const changeMember = (idx: number) => {
    setProfile(profiles[idx]);
  };

  const getChattings = async () => {
    try {
      console.log(
        "요청 URL: ",
        `https://nuto.mirim-it-show.site/message/${encodeURIComponent(
          profile.name
        )}`
      );

      const response = await axios.get(
        `https://nuto.mirim-it-show.site/message/${encodeURIComponent(
          profile.name
        )}`
      );

      const userChats: checkChat[] = response.data.data.map((chat: chat) => {
        return {
          type: "check-chat",
          data: {
            name: chat.name,
            comment: chat.message,
          },
        };
      });
      setChattings(userChats);
      console.log(userChats);
    } catch (error) {
      console.error("Failed to fetch chattings:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getChattings();
    };
    fetchData();
  }, [profile.name]);

  return (
    <div className={style.Body}>
      <img src="/images/logo.svg" className={style.logo} alt="Logo" />
      <Members type="check" profiles={profiles} changeMember={changeMember} />
      <Chatting chattings={chattings} />
      <Footer />
    </div>
  );
}

export default CheckChat;
