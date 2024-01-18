import { useEffect, useState } from "react";
import { ContextProvider } from "./components/ContextApp";
import { InitSocketProvider } from "./components/ContextInitSocket";
import { ViewController } from "./components/ViewController";
import { Socket } from "./components/Socket";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { SocketProvider } from "./components/ContextSocket";

function App() {
  useEffect(() => {
    document.title = "WERP";
  }, []);

  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <InitSocketProvider>
        <SocketProvider>
          <ContextProvider>
            <div className="row">
              <ViewController />
            </div>
            <div className="row">
              <Socket />
            </div>
          </ContextProvider>
        </SocketProvider>
      </InitSocketProvider>
    </div>
  );
}

export default App;
