import React, { useState, useEffect } from "react";
import Members from "../../components/Members";
import { profiles } from "../../assets/json/profiles";
import style from "../../styles/Admin.module.css";
import def from "../../styles/Default.module.css";
import Chatting from "../../components/Chatting";
import axios from "axios";
import { useIsLogin } from "../../context/LoginContext";
import { Navigate } from "react-router-dom";

type adminChat = {
  type: "admin-chat";
  data: {
    message: string;
    createdAt: string;
  };
};

function Admin() {
  const [profile, setProfile] = useState(profiles[0]);
  const [chattings, setChattings] = useState<adminChat[]>([]);
  const [idx, setIdx] = useState(0);
  const { isLogin, setIsLogin } = useIsLogin();

  useEffect(() => {
    changeMember(idx);
  }, [profile, idx]);

  const changeMember = async (idx: number) => {
    setProfile(profiles[idx]);
    setIdx(idx);
    try {
      const response = await axios.get(`/message/${profile.name}`);

      const adminChats: adminChat[] = response.data.data.map(
        (chat: { message: string; createdAt: string }) => {
          return {
            type: "admin-chat",
            data: {
              message: chat.message,
              createdAt: chat.createdAt,
            },
          };
        }
      );

      setChattings(adminChats);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLogin) {
    return (
      <div className={def.Body}>
        <img src="/images/logo.svg" className={style.logo} />
        <Members type="check" profiles={profiles} changeMember={changeMember} />

        <Chatting chattings={chattings} />
      </div>
    );
  } else {
    return <Navigate to="/admin" />;
  }
}

export default Admin;
