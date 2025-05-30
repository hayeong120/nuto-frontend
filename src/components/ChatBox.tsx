import style from "../styles/ChatBox.module.css";

function ChatBox(props: {
  type: "default" | "send" | "admin" | "check";
  img?: string;
  comment: string;
  name?: string;
  time?: string;
}) {
  if (props.type === "default") {
    return (
      <div className={style["default-chat-container"]}>
        <div className={style["profile-container"]}>
          <img src={props.img} alt={props.img} />
          <p>{props.name}</p>
        </div>
        <div className={style["default-chat"]}>
          <p>{props.comment}</p>
        </div>
      </div>
    );
  } else if (props.type === "send") {
    return (
      <div className={style["send-chat-container"]}>
        <div className={style["send-chat"]}>
          <p>{props.comment}</p>
        </div>
      </div>
    );
  } else if (props.type === "check") {
    return (
      <div className={style.checkChatContainer}>
        <div className={style["check-chat"]}>
          <p>{props.comment}</p>
        </div>
        <p>{props.time}</p>
      </div>
    );
  } else {
    return (
      <div className={style["admin-chat-container"]}>
        <div className={style["admin-chat"]}>
          <p>{props.comment}</p>
        </div>
        <p>
          {props.time
            ? new Date(props.time).getHours() +
              ":" +
              new Date(props.time).getMinutes()
            : ""}
        </p>
      </div>
    );
  }
}

export default ChatBox;
