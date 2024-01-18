import { useState, useContext, useEffect } from "react";
import { socketContext } from "./ContextSocket";

function Chat() {
  const [messages, setMessages] = useState([]);
  const { setRequest, socketResponse, setSocketResponse } =
    useContext(socketContext);
  return (
    <div className="chat d-grid gap-2 col-3 mx-auto">
      <button
        type="button"
        class="btn btn-secondary text-center"
        data-bs-toggle="modal"
        data-bs-target="#RTChat_Modal"
      >
        RTChat
      </button>
      <div
        class="modal fade"
        id="RTChat_Modal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-warning text-center">
              <h5 class="modal-title" id="RTChat_Modal_Label">
                Live Chat
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div
                className="chatDiv border border-dark rounded"
                style={{ maxHeight: "50vh", height: "50vh", overflow: "auto" }}
              >
                {messages.map((message, index) => (
                  <div className="row">{message}</div>
                ))}
              </div>
            </div>
            <div class="modal-footer">
              <div className="row">
                <div className="col-10">
                  <div className="row">
                    <div class="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        Your Message
                      </span>
                      <input
                        type="text"
                        class="form-control"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <div className="row">
                    <div class="d-grid gap-2">
                      <button class="btn btn-success" type="button">
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
