import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const socketContext = createContext();

export function SocketProvider({ children }) {
  const [request, setRequest] = useState({});
  const [socket, setSocket] = useState(
    io(
      `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_DOMAIN}:${
        import.meta.env.VITE_PORT
      }`
    )
  );
  const [socketResponse, setSocketResponse] = useState(null);

  return (
    <socketContext.Provider
      value={{ socket, setRequest, request, socketResponse, setSocketResponse }}
    >
      {children}
    </socketContext.Provider>
  );
}
