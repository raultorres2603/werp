import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ContextProvider } from "./components/contextApp";
import { ViewController } from "./components/viewController";
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
