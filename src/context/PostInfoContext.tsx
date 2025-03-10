import { createContext, useContext, useEffect, useState } from "react";

interface PostInfoContextProps {
  name: string;
  location: string;
  password: string;
  setName: (name: string) => void;
  setLocation: (location: string) => void;
  setPassword: (password: string) => void;
}

const PostInfoContext = createContext<PostInfoContextProps | undefined>(
  undefined
);

export const PostInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [name, setName] = useState(() => sessionStorage.getItem("name") || "");
  const [location, setLocation] = useState(
    () => sessionStorage.getItem("location") || ""
  );
  const [password, setPassword] = useState(
    () => sessionStorage.getItem("password") || ""
  );

  useEffect(() => {
    if (name !== "") {
      sessionStorage.setItem("name", name);
    }
    if (location !== "") {
      sessionStorage.setItem("location", location);
    }
    if (password !== "") {
      sessionStorage.setItem("password", password);
    }
  }, [name, location, password]);

  return (
    <PostInfoContext.Provider
      value={{ name, location, password, setName, setLocation, setPassword }}
    >
      {children}
    </PostInfoContext.Provider>
  );
};

export const usePostInfo = () => {
  const context = useContext(PostInfoContext);
  if (!context) {
    throw new Error("usePostInfo must be used within a PostInfoProvider");
  }
  return context;
};
