import { createContext, useContext, useState } from "react";

interface PolariodContextProps {
  nutoFile: File | null;
  polariodFile: File | null;
  setNutoFile: (file: File | null) => void;
  setPolariodFile: (file: File | null) => void;
}

const PolariodContext = createContext<PolariodContextProps | undefined>(
  undefined
);

export const PolariodProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [nutoFile, setNutoFile] = useState<File | null>(null);
  const [polariodFile, setPolariodFile] = useState<File | null>(null);

  return (
    <PolariodContext.Provider
      value={{ nutoFile, polariodFile, setNutoFile, setPolariodFile }}
    >
      {children}
    </PolariodContext.Provider>
  );
};

export const usePolariod = () => {
  const context = useContext(PolariodContext);
  if (!context)
    throw new Error("usePolariod must be used within a PolariodProvider");
  return context;
};
