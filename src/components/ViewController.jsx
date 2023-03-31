import { useContext, useEffect, useState } from "react";
import { appContext } from "./ContextApp";
import { Login } from "./Login";
import { Register } from "./Register";

export function ViewController() {
  const { page } = useContext(appContext);

  function handlePage() {
    switch (page) {
      case "login":
        return <Login />;
        break;

      case "register":
        return <Register />;
        break;

      default:
        break;
    }
  }

  return <div className="viewController">{handlePage()}</div>;
}
