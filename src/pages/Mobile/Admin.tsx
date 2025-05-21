import React, { useState, useEffect, useCallback } from "react";
import Members from "../../components/Members";
import { profiles } from "../../assets/json/profiles";
import style from "../../styles/Admin.module.css";
import def from "../../styles/Default.module.css";
import Chatting from "../../components/Chatting";
import { useIsLogin } from "../../context/LoginContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

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
  const { isLogin } = useIsLogin();

  useEffect(() => {
    changeMember(idx);
  }, [profile, idx]);

  const changeMember = useCallback(async (idx: number) => {
    setProfile(profiles[idx]);
    setIdx(idx);
    try {
      const response = await axios.get(
        `https://nuto.mirim-it-show.site/message${profile.name}`
      );

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
  }, [profiles]);

  if (isLogin) {
    return (
      <div className={def.Body}>
        <img alt="logo" src="/images/logo.svg" className={style.logo} />
        <Members type="check" profiles={profiles} changeMember={changeMember} />

        <Chatting chattings={chattings} />
      </div>
    );
  } else {
    return <Navigate to="/admin" />;
  }
}

export default Admin;
