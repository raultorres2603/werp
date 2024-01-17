import { useState, useContext, useEffect } from "react";
import { socketContext } from "./ContextSocket";
import { Alert } from "./Alert";

function Chat() {
  return (
    <div className="chat d-grid gap-2 col-3 mx-auto">
      <button type="button" class="btn btn-secondary text-center">
        RTChat
      </button>
    </div>
  );
}

export default Chat;
