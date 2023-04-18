import { useContext, useEffect, useState } from "react";
import { appContext } from "./ContextApp";
import { socketContext } from "./ContextSocket";

export function Socket() {
  const [connected, setConnected] = useState(false);
  const [requested, setRequested] = useState(null);
  const { socket, request, setSocketResponse } = useContext(socketContext);

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
      if (args.error) {
        setSocketResponse({ error: args.error });
      } else {
        setSocketResponse({ result: "Updated Correctly!" });
      }
    });
  }

  return (
    <div className="socketDiv fs-6 d-flex justify-content-center">
      State of socket: {connected ? "Connected" : "Disconnected"}
    </div>
  );
}