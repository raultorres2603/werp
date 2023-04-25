import { useContext, useEffect, useState } from "react";
import { appContext } from "./ContextApp";
import { Login } from "./Login";
import { Register } from "./Register";
import { Main } from "./Main";
import { Profile } from "./Profile";
import { Navbar } from "./Navbar";
import { HR } from "./HR";

export function ViewController() {
  const { page } = useContext(appContext);

  function handlePage() {
    document.title = `WERP - ${page.toUpperCase()}`;
    switch (page) {
      case "login":
        return <Login />;
        break;

      case "register":
        return <Register />;
        break;

      case "main":
        return (
          <>
            {" "}
            <Navbar />
            <Main />
          </>
        );
        break;
      case "profile":
        return (
          <>
            {" "}
            <Navbar />
            <Profile />
          </>
        );
        break;

      case "hr":
        return (
          <>
            {" "}
            <Navbar />
            <HR />
          </>
        );
        break;

      default:
        break;
    }
  }

  return <div className="viewController">{handlePage()}</div>;
}
