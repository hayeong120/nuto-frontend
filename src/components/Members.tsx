import { useNavigate } from "react-router-dom";
import { Profile } from "../assets/interface/Profile";
import Member from "./Member";
import style from "../styles/Chat.module.css";

function Members(props: {
  type: "check" | "send";
  profiles: Profile[];
  changeMember: (idx: number) => void;
}) {
  const navigate = useNavigate();
  const teamIntro = {
    img: "/images/teamProfile.png",
    name: "Nuto",
  };

  return (
    <div className={style["member-container"]}>
      {props.type === "send" ? (
        <Member
          img={teamIntro.img}
          name={teamIntro.name}
          idx={-1}
          changeMember={() => props.changeMember(-1)}
        />
      ) : null}
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
