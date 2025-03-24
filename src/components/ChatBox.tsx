import style from "../styles/ChatBox.module.css";

function ChatBox(props: {
  type: "default" | "send";
  img?: string;
  comment: string;
  name?: string;
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
  } else {
    return (
      <div className={style["send-chat-container"]}>
        <div className={style["send-chat"]}>
          <p>{props.comment}</p>
        </div>
      </div>
    );
  }
}

export default ChatBox;
