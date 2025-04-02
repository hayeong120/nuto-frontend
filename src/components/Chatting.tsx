import ChatBox from "./ChatBox";
import style from "../styles/Chatting.module.css";

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

type adminChat = {
  type: "admin-chat";
  data: {
    message: string;
    createdAt: string;
  };
};

function Chatting(props: {
  chattings: (defaultChat | userChat | adminChat)[];
}) {
  return (
    <div className={style.chattings}>
      {props.chattings.map((chatting, index) => {
        if (chatting.type === "default-chat") {
          return (
            <ChatBox
              type="default"
              name={chatting.data.name}
              comment={chatting.data.comment}
              img={chatting.data.img}
            />
          );
        } else if (chatting.type === "user-chat") {
          return <ChatBox type="send" comment={chatting.data.comment} />;
        } else {
          return (
            <ChatBox
              type="admin"
              comment={chatting.data.message}
              time={chatting.data.createdAt}
            />
          );
        }
      })}
    </div>
  );
}

export default Chatting;
