import { useState } from "react";
import axios from "axios";
import { useIsLogin } from "../../context/LoginContext";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { isLogin, setIsLogin } = useIsLogin();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_NUTO_ROUTE}/check/login`,
        {
          id: id,
          pw: password,
        }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token); // JWT 저장
        alert("로그인 성공");
        setIsLogin(true);
        window.location.href = "/check-message";
      }
    } catch (err) {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div>
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="ID"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="PW"
        type="password"
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default Login;
