import { useContext, useState } from "react";
import { Navbar } from "./Navbar";
import { Profile } from "./Profile";
import { Resume } from "./Resume";

export function Main() {
  return (
    <div className="main-container">
      <div className="row">
        <Resume />
      </div>
    </div>
  );
}
