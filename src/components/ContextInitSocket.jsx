import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const socketInitContext = createContext();

export function InitSocketProvider({ children }) {
  const [socket, setSocket] = useState(
    io(
      `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_DOMAIN}:${
        import.meta.env.VITE_PORT
      }`
    )
  );
  return (
    <socketInitContext.Provider value={{ socket, setSocket }}>
      {children}
    </socketInitContext.Provider>
  );
}
