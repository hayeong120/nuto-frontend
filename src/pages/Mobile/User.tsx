import { useNavigate } from "react-router-dom";
import { usePostInfo } from "../../context/PostInfoContext";
import styles from "../../styles/User.module.css";

function User() {
  const navigate = useNavigate();
  const { name, setName } = usePostInfo();

  const login = () => {
    if (name.trim() !== "") {
      navigate("/home");
      console.log("클릭");
    }
  };

  return (
    <div className={styles.loginBody}>
      <div className={styles.loginContainer}>
        <img
          src="/images/userTomato.svg"
          className={styles.tomato}
          alt="tomatoImage"
        />
        <div className={styles.explainContainer}>
          <p className={styles.explainText}>
            아이디를 바탕으로 포스트를 작성하거나
          </p>
          <p className={styles.explainText}>댓글을 작성할 수 있습니다!</p>
        </div>

        <input
          placeholder="아이디"
          value={name}
          onChange={(e) => setName(e.target.value.trim())}
          className={styles.input}
        />

        <button onClick={login} className={styles.loginBtn}>
          들어가기
        </button>
      </div>
    </div>
  );
}

export default User;
