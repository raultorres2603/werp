import { createContext, useState } from "react";

export const appContext = createContext();

export function ContextProvider({ children }) {
  const [page, savePage] = useState(
    sessionStorage.getItem("user") ? "main" : "login"
  );

  return (
    <appContext.Provider value={{ page, savePage }}>
      {children}
    </appContext.Provider>
  );
}
