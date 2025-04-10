import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface LoginContextType {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({ children }: { children: ReactNode }) {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
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
