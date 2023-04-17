import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ContextProvider } from "./components/ContextApp";
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
    <div className="App" style={{ width: "100vw" }}>
      <SocketProvider>
        <ContextProvider>
          <ViewController />
          <Socket />
        </ContextProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
