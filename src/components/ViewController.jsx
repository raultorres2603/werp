import { useContext, useState } from "react";
import { appContext } from "./contextApp";
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

  return handlePage;
}

export default App;
