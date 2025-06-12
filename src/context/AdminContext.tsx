import { createContext, useContext, useState, ReactNode } from "react";

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useIsAdmin() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error("newIsLogin doesn't have any value");
  }

  return context;
}
