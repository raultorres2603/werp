import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { socketContext } from "./ContextSocket";

export const appContext = createContext();

export function ContextProvider({ children }) {
  const [page, savePage] = useState(
    sessionStorage.getItem("user") ? "main" : "login"
  );
  const { setRequest } = useContext(socketContext);
  const [hrUsers, setHrUsers] = useState([]);
  const [depts, setDepts] = useState([]);

  useEffect(() => {
    setRequest({ req: "getHrUsers", fields: {} });
  }, []);

  return (
    <appContext.Provider
      value={{ savePage, page, depts, setDepts, hrUsers, setHrUsers }}
    >
      {children}
    </appContext.Provider>
  );
}
