import { createContext, useState } from "react";
import { io } from "socket.io-client";

export const appContext = createContext();

export function ContextProvider({ children }) {
  const [page, savePage] = useState(
    sessionStorage.getItem("user") ? "main" : "login"
  );

  const socket = io("http://localhost:3000");

  return (
    <appContext.Provider value={{ page, savePage }}>
      {children}
    </appContext.Provider>
  );
}
