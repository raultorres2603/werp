import { useContext, useEffect, useState } from "react";
import { appContext } from "./ContextApp";
import { socketContext } from "./ContextSocket";

export function Socket() {
  const [connected, setConnected] = useState(false);
  const [requested, setRequested] = useState(null);
  const { socket, request, setSocketResponse } = useContext(socketContext);
  const { setHrUsers, setDepts } = useContext(appContext);

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
        setSocketResponse({ error: args.error.message });
      } else {
        setSocketResponse({ result: "Updated Correctly!" });
      }
    });

    socket.on("getHrUsersOk", (args) => {
      if (args.hasOwnProperty("err")) {
        alert(`It has been an error: ${args.err.message}`);
      } else {
        console.log(args.res);
        setHrUsers(args.res);
      }
    });

    socket.on("getDeptsOK", (args) => {
      if (args.hasOwnProperty("err")) {
        alert(`It has been an error: ${args.err.message}`);
      } else {
        console.log(args);
        setDepts(args.res);
      }
    });

    socket.on("updatedInfoHR", (args) => {
      console.log(args);
      if (args.err != "NO") {
        console.log(args.err.sqlMessage);
        alert(`It has been an error: ${args.err}`);
      } else {
        setSocketResponse({ result: "Someone updated, please, enter again!" });
      }
    });
  }

  return (
    <div className="socketDiv fs-6 d-flex justify-content-center">
      State of socket: {connected ? "Connected" : "Disconnected"}
    </div>
  );
}
