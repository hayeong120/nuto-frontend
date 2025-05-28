import { useNavigate } from "react-router-dom";
import { usePostInfo } from "../../context/PostInfoContext";
import styles from "../../styles/User.module.css"

function User() {
    const navigate = useNavigate();
    const {name, setName, password, setPassword} = usePostInfo();

    const login = () => {
        if(name != "" && password != ""){
            navigate("/home")
            console.log('클릭');
        }
    }

    return (
        <div className={styles.loginBody}>
            <div className={styles.loginContainer}>
                <img 
                    src="/images/userTomato.svg"
                    className={styles.tomato}/>
                <img 
                    src="/images/userNuto.svg"
                    className={styles.nuto}/>
                <input 
                    placeholder="아이디"
                    value={name}
                    onChange={e => setName((e.target.value).trim())}
                    className={styles.input}/>
                <input 
                    placeholder="비밀번호"
                    value={password}
                    onChange={e => setPassword((e.target.value).trim())}
                    className={styles.input}/>
                <button onClick={login} className={styles.loginBtn}>들어가기</button>
            </div>
        </div>
    )
}

export default User;