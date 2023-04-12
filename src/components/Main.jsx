import { useContext, useState } from "react";
import { Navbar } from "./Navbar";
import { Profile } from "./Profile";

export function Main() {
  return (
    <div className="main-container">
      <div className="row">
        <Navbar />
      </div>
      <div className="row">
        <Profile />
      </div>
    </div>
  );
}
