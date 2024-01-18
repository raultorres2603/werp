import { useState, useContext, useEffect } from "react";
import { socketContext } from "./ContextSocket";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [myMessage, setMyMessage] = useState("");
  const { setRequest, socketResponse, setSocketResponse } =
    useContext(socketContext);

  function saveMessage(e) {
    let message = e.target.value;
    setMyMessage(message);
    // setMyMessage((myMessage) => [...myMessage, message]); --> Put on an array state
    console.log(myMessage);
  }

  return (
    <div className="chat d-grid gap-2 col-3 mx-auto">
      <button
        type="button"
        className="btn btn-secondary text-center"
        data-bs-toggle="modal"
        data-bs-target="#RTChat_Modal"
      >
        RTChat
      </button>
      <div
        className="modal fade"
        id="RTChat_Modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-warning text-center">
              <h5 className="modal-title" id="RTChat_Modal_Label">
                Live Chat
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div
                className="chatDiv border border-dark rounded"
                style={{ maxHeight: "50vh", height: "50vh", overflow: "auto" }}
              >
                {messages.map((message, index) => (
                  <div className="row" key={index}>
                    {message}
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <div className="row">
                <div className="col-10">
                  <div className="row">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        Your Message
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        onInput={saveMessage}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <div className="row">
                    <div className="d-grid gap-2">
                      <button className="btn btn-success" type="button">
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
