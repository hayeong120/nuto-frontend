import { Profile } from "../assets/interface/Profile";
import Member from "./Member";
import style from "../styles/Chat.module.css";

function Members(props: {
  profiles: Profile[];
  changeMember: (idx: number) => void;
}) {
  return (
    <div className={style["member-container"]}>
      {props.profiles.map((profile, idx) => {
        return (
          <Member
            img={profile.img}
            name={profile.name}
            idx={idx}
            changeMember={(idx) => props.changeMember(idx)}
          />
        );
      })}
    </div>
  );
}

export default Members;
