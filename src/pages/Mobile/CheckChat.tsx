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
    console.log(profile.name, profiles);
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
