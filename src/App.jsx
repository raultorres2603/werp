import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ContextProvider } from "./components/ContextApp";
import { ViewController } from "./components/ViewController";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <ViewController />
      </ContextProvider>
    </div>
  );
}

export default App;
