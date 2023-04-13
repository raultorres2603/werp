import { createContext, useState } from "react";
import { io } from "socket.io-client";

export const socketContext = createContext();

export function SocketProvider({ children }) {
  let socket = io(
    `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_DOMAIN}:${
      import.meta.env.VITE_PORT
    }`
  );

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
}
