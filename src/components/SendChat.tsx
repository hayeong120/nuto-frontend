import style from "../styles/SendChat.module.css";

function SendChat(props: { comment: string }) {
  return (
    <div className={style["send-chat-container"]}>
      <div className={style["send-chat"]}>
        <p>{props.comment}</p>
      </div>
    </div>
  );
}

export default SendChat;
