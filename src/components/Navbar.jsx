import { useContext, useState } from "react";
import { appContext } from "./ContextApp";

export function Navbar() {
  let { savePage } = useContext(appContext);

  function changePage(page) {
    savePage(page);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <a
          className="navbar-brand"
          href="#"
          onClick={() => {
            changePage("main");
          }}
        >
          WERP
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link"
                aria-current="page"
                href="#"
                onClick={() => {
                  changePage("profile");
                }}
              >
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                aria-current="page"
                href="#"
                onClick={() => {
                  changePage("hr");
                }}
              >
                HR
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                aria-current="page"
                href="#"
                onClick={() => {
                  changePage("facturation");
                }}
              >
                Facturation
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
