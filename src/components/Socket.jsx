import { useContext, useEffect, useState } from "react";
import { appContext } from "./ContextApp";
import { socketContext } from "./ContextSocket";

export function Socket() {
  const [connected, setConnected] = useState(false);
  const [requested, setRequested] = useState(null);
  const { socket, request } = useContext(socketContext);

  useEffect(() => {
    addSocketListeners();
  }, []);

  useEffect(() => {
    if (request != {}) socket.emit(request.req, { fields: request.fields });
  }, [request]);

  function addSocketListeners() {
    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("connect", () => {
      setConnected(true);
      console.log(socket);
    });

    socket.on("updatedProfileInfo", (args) => {
      console.log(args);
    });
  }

  return (
    <div className="socketDiv fs-6">
      State of socket: {connected ? "Connected" : "Disconnected"}
    </div>
  );
}
