import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from "react";

interface LoginContextType {
  username: string;
  isLogin: boolean;
  setUsername: (name: string) => void;
  setIsLogin: (isLogin: boolean) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

const SESSION_DURATION = 10000; // 5분
const WARNING_BEFORE = 5000; // 30초

export function LoginProvider({ children }: { children: ReactNode }) {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState(
    () => sessionStorage.getItem("username") || ""
  );
  const [showWarning, setShowWarning] = useState(false);
  const timerRef = useRef(null);
  const warningRef = useRef(null);

  const startSession = () => {
    console.log("session start");
    setIsLogin(true);
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("sessionStart", Date.now().toString());

    // 이름 저장
    sessionStorage.setItem("username", username);

    // 타이머 설정
    clearTimeout(timerRef.current);
    clearTimeout(warningRef.current);
    timerRef.current = setTimeout(() => {
      setIsLogin(false);
      sessionStorage.removeItem("username"); // 수정
      localStorage.removeItem("sessionStart");
      alert("세션이 만료되었어요!");
    }, SESSION_DURATION);

    warningRef.current = setTimeout(() => {
      setShowWarning(true);
    }, SESSION_DURATION - WARNING_BEFORE);
  };

  // 연장
  const extendSession = () => {
    startSession();
    setShowWarning(false);
  };

  // 종료
  const endSession = () => {
    setIsLogin(false);
    sessionStorage.removeItem("username");
    localStorage.removeItem("sessionStart");
    setShowWarning(false);
  };

  //  초기 username 복원
  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  //  username이 복원된 이후 세션 체크
  useEffect(() => {
    if (!username) return;

    const storedTimeRaw = localStorage.getItem("sessionStart");
    if (!storedTimeRaw) {
      // 세션 시작 정보 없으면 종료 처리
      endSession();
      return;
    }

    const storedTime = new Date(Number(storedTimeRaw));
    if (isNaN(storedTime.getTime())) {
      // 유효하지 않은 날짜면 종료
      endSession();
      return;
    }

    const elapsed = Date.now() - storedTime.getTime();

    if (elapsed < SESSION_DURATION) {
      console.log("session is still valid");
      startSession();
    } else {
      console.log("session is not valid");
      endSession();
    }
  }, [username]);

  return (
    <LoginContext.Provider
      value={{ username, isLogin, setUsername, setIsLogin }}
    >
      {children}
      {showWarning && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            background: "#fff",
            border: "2px solid #ff5c5c",
            padding: "20px",
            borderRadius: "10px",
            zIndex: 9999,
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <p>세션이 곧 만료돼요. 연장할까요?</p>
          <button onClick={extendSession}>연장</button>
          <button onClick={endSession}>종료</button>
        </div>
      )}
    </LoginContext.Provider>
  );
}

export function useIsLogin() {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error("newIsLogin doesn't have any value");
  }

  return context;
}
