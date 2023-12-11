import { useContext, useEffect, useState } from "react";
import { appContext } from "./ContextApp";
import { socketContext } from "./ContextSocket";

export function Socket() {
  const [connected, setConnected] = useState(false);
  const [requested, setRequested] = useState(null);
  const { socket, request, setSocketResponse, setRequest } =
    useContext(socketContext);
  const { setHrUsers, setDepts, savePage, page } = useContext(appContext);

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

    socket.on("editBillOk", (args) => {
      if (args.error == 1) {
        setSocketResponse({ error: "Can't update bill" });
      } else {
        setSocketResponse({ result: "Updated correctly" });
      }
    });

    socket.on("connect", () => {
      setConnected(true);
      console.log(socket);
    });

    socket.on("insertBillOk", (args) => {
      if (args.hasOwnProperty("error")) {
        console.log(args.error);
        setSocketResponse({
          req: "insertBill",
          text: `It was an error introducing the bill.`,
          page: page,
        });
      } else {
        console.log(args.res);
        setSocketResponse({
          req: "insertBill",
          text: `Bill inserted!`,
          page: page,
        });
      }
    });

    socket.on("askEnterPage", (args) => {
      console.log("Quieres entrar?");
      let page = args.page;
      setSocketResponse({
        req: "askEnter",
        text: `Is your turn to go to ${page} page, do you want to go?`,
        page: page,
      });
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
      } else {
        setSocketResponse({ result: "Update done!" });
      }
    });

    socket.on("roomComprobOk", (args) => {
      if (args.hasOwnProperty("position")) {
        setSocketResponse({
          req: "waitPosition",
          text: `You can't enter, you're on ${args.position} to enter`,
          page: args.page,
        });
      } else if (args.hasOwnProperty("add")) {
        switch (args.add) {
          case "request":
            setSocketResponse({
              req: "askQueueAlert",
              text: `Do you want to join the queue and be notified when you have acces? You can't enter now`,
              page: args.page,
              socket: args.socket,
            });
            break;

          default:
            break;
        }
      }
    });

    socket.on("addOnQueueOK", (args) => {
      console.log("added on queue");
      savePage("main");
    });
  }

  return (
    <div className="socketDiv fs-6 d-flex justify-content-center">
      State of socket: {connected ? "Connected" : "Disconnected"}
    </div>
  );
}
