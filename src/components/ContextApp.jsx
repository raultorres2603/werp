import { createContext, useState } from "react";
import { io } from "socket.io-client";

export const appContext = createContext();

export function ContextProvider({ children }) {
  const [page, savePage] = useState(
    sessionStorage.getItem("user") ? "main" : "login"
  );

  const [employees, setEmployees] = useState(null);

  const [request, setRequest] = useState({});

  /*const socket = io(
    `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_DOMAIN}:${
      import.meta.env.VITE_PORT
    }`
  );
  */

  return (
    <appContext.Provider
      value={{ savePage, setEmployees, setRequest, request, page }}
    >
      {children}
    </appContext.Provider>
  );
}
