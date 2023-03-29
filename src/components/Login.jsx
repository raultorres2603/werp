import { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Encrypter } from "../lib/Encrypter";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function sendLogin(ev) {
    ev.preventDefault();
    console.log(ev);
    setUsername(Encrypter.encryptAES(ev.target.elements.username_inp.value));
    setPassword(Encrypter.encryptAES(ev.target.elements.password_inp.value));
    console.log(`User: ${username}`);
    console.log(`Password:${password}`);
  }

  return (
    <div className="login-container">
      <div className="row">
        <div className="display-4 text-center mb-3 fw-bold">Login</div>
      </div>
      <form onSubmit={sendLogin} id="loginForm" action="#">
        <div className="row">
          <div className="col-sm-6">
            <div className="mb-3">
              <label
                htmlFor="username_inp"
                className="form-label fs-4 fw-medium"
              >
                Username
              </label>
              <input
                type="text"
                className="form-control fs-4"
                id="username_inp"
                placeholder="Type here!"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb-3">
              <label
                htmlFor="password_inp"
                className="form-label fs-4 fw-medium"
              >
                Password
              </label>
              <input
                type="password"
                className="form-control fs-4"
                id="password_inp"
                placeholder="Type here!"
              />
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <button type="submit" className="btn btn-success fs-4">
            Success
          </button>
        </div>
      </form>
    </div>
  );
}
