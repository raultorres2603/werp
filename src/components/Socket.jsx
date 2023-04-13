import { useContext, useEffect, useState } from "react";
import { appContext } from "./ContextApp";
import { socketContext } from "./ContextSocket";

export function Socket() {
  const [connected, setConnected] = useState(false);
  const { request } = useContext(appContext);
  const { socket } = useContext(socketContext);

  useEffect(() => {
    addSocketListeners();
  }, []);

  useEffect(() => {
    if (request != {})
      socket.emit(request.req, { field: request.field, value: request.value });
  }, [request]);

  function addSocketListeners() {
    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("connect", () => {
      setConnected(true);
      console.log(socket);
    });

    socket.on("updatedInfo", (args) => {
      console.log(args);
    });
  }

  return (
    <div className="socketDiv fs-6">
      State of socket: {connected ? "Connected" : "Disconnected"}
    </div>
  );
}
