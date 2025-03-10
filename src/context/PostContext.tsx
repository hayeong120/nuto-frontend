import { createContext, useContext, useState, useEffect } from "react";

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
  const [nutoFile, setNutoFile] = useState<File | null>(() => {
    const savedNutoFile = sessionStorage.getItem("nutoFile");
    return savedNutoFile ? JSON.parse(savedNutoFile) : null;
  });
  const [polariodFile, setPolariodFile] = useState<File | null>(() => {
    const savedPolariodFile = sessionStorage.getItem("polariodFile");
    return savedPolariodFile ? JSON.parse(savedPolariodFile) : null;
  });

  useEffect(() => {
    if (nutoFile) {
      sessionStorage.setItem("nutoFile", JSON.stringify(nutoFile));
    }

    if (polariodFile) {
      sessionStorage.setItem("polariodFile", JSON.stringify(polariodFile));
    }
  }, [nutoFile, polariodFile]);

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
