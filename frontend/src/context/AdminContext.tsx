// src/context/AdminContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

type Admin = {
  name: string;
  role: "admin";
};

type AdminContextType = {
  admin: Admin | null;
  setAdmin: (admin: Admin | null) => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
};
