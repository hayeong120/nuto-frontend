import { createContext, useContext, useState } from "react";

interface UserContextProps {
  name: string;
  location: string;
  password: string;
  setName: (name: string) => void;
  setLocation: (location: string) => void;
  setPassword: (password: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");

  return (
    <UserContext.Provider
      value={{ name, location, password, setName, setLocation, setPassword }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
