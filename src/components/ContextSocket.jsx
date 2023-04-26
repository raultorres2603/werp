import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { socketInitContext } from "./ContextInitSocket";

export const socketContext = createContext();

export function SocketProvider({ children }) {
  const [request, setRequest] = useState({});
  const { socket } = useContext(socketInitContext);
  const [socketResponse, setSocketResponse] = useState(null);

  return (
    <socketContext.Provider
      value={{ socket, setRequest, request, socketResponse, setSocketResponse }}
    >
      {children}
    </socketContext.Provider>
  );
}
