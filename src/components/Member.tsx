import style from "../styles/Member.module.css";

function Member(props: { img: string; name: string }) {
  return (
    <div className={style.Member}>
      <img src={props.img} alt={props.name} />
      <p>{props.name}</p>
    </div>
  );
}

export default Member;
