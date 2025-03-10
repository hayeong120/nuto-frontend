import { createContext, useContext, useState, ReactNode } from "react";

interface NutoContextType {
  nuto: string;
  setNuto: (image: string) => void;
}

const NutoContext = createContext<NutoContextType | undefined>(undefined);

export function NutoProvider({ children }: { children: ReactNode }) {
  const [nuto, setNuto] = useState<string>("");

  return (
    <NutoContext.Provider value={{ nuto, setNuto }}>
      {children}
    </NutoContext.Provider>
  );
}

export function useNuto() {
  const context = useContext(NutoContext);

  if (!context) {
    throw new Error("useImage doesn't have any value");
  }

  return context;
}
