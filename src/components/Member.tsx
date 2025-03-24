import style from "../styles/Member.module.css";

function Member(props: {
  img: string;
  name: string;
  idx: number;
  changeMember: (idx: number) => void;
}) {
  return (
    <div className={style.Member} onClick={() => props.changeMember(props.idx)}>
      <img src={props.img} alt={props.name} />
      <p>{props.name}</p>
    </div>
  );
}

export default Member;
