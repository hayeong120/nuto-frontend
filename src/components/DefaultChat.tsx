import style from "../styles/DefaultChat.module.css";

function DefaultChat(props: { img: string; comment: string; name: string }) {
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
}

export default DefaultChat;
