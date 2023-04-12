import { createContext, useState } from "react";
import { io } from "socket.io-client";

export const appContext = createContext();

export function ContextProvider({ children }) {
  const [page, savePage] = useState(
    sessionStorage.getItem("user") ? "main" : "login"
  );

  const socket = io(
    `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_DOMAIN}:${
      import.meta.env.VITE_PORT
    }`
  );

  return (
    <appContext.Provider value={{ page, savePage, socket }}>
      {children}
    </appContext.Provider>
  );
}
