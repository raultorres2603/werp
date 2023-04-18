import { useContext, useEffect, useState } from "react";
import { Users } from "../lib/Users";
import { socketContext } from "./ContextSocket";

export function Resume() {
  const { setRequest, socketResponse } = useContext(socketContext);

  return (
    <div className="col-12-sm">
      <div
        className="resume-container mt-3"
        style={{ width: "100vw", height: "100vh" }}
      >
        <div className="card">
          <h5 className="card-header bg-info text-center fs-2">My Profile</h5>
          <div className="card-body">
            {socketResponse && socketResponse.error && (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                {socketResponse.error}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}
            {socketResponse && socketResponse.result && (
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                {socketResponse.result}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}

            <div className="card-text">Hola</div>
          </div>
        </div>
      </div>
    </div>
  );
}
