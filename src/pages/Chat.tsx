import BusinessCard from "../components/BusinessCard";
import def from "../styles/Default.module.css";
import Member from "../components/Member";

function Chat({}) {
  const profile = {
    name: "오지은",
    type: "백엔드 개발자",
    img: "/images/꽃.png",
    introduce: "성장하는 개발자 오지은입니다.",
    skills: ["TypeScript", "Java"],
  };
  return (
    <div className={def.Body}>
      <Member img="/images/해.png" name="오지은" />
      <BusinessCard profile={profile} />
    </div>
  );
}

export default Chat;
