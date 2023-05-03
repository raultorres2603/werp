import { useContext, useEffect, useState } from "react";
import { Users } from "../lib/Users";
import { Alert } from "./Alert";
import { socketContext } from "./ContextSocket";

export function Resume() {
  const { setRequest, socketResponse, setSocketResponse } =
    useContext(socketContext);

  useEffect(() => {
    setSocketResponse(null);
  }, []);

  return (
    <div className="col-12-sm">
      <div
        className="resume-container mt-3"
        style={{ width: "100vw", height: "100vh" }}
      >
        <div className="card">
          <h5 className="card-header bg-info text-center fs-2">My Profile</h5>
          <div className="card-body">
            <Alert />

            <div className="card-text">Hola</div>
          </div>
        </div>
      </div>
    </div>
  );
}
