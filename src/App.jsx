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
  return (
    <div className="App">
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
