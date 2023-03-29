import { useContext, useEffect, useState } from "react";
import { appContext } from "./ContextApp";
import { Login } from "./Login";

export function ViewController() {
  const { page } = useContext(appContext);

  function handlePage() {
    switch (page) {
      case "login":
        return <Login />;
        break;

      default:
        break;
    }
  }

  return <div className="viewController">{handlePage()}</div>;
}
