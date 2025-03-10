import { createContext, useContext, useState, ReactNode } from "react";

interface PolariodContextType {
  polariod: string;
  setPolariod: (image: string) => void;
}

const PolariodContext = createContext<PolariodContextType | undefined>(
  undefined
);

export function PolariodProvider({ children }: { children: ReactNode }) {
  const [polariod, setPolariod] = useState<string>("");

  return (
    <PolariodContext.Provider value={{ polariod, setPolariod }}>
      {children}
    </PolariodContext.Provider>
  );
}

export function usePolariod() {
  const context = useContext(PolariodContext);

  if (!context) {
    throw new Error("useImage doesn't have any value");
  }

  return context;
}
