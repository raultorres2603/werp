import { useContext, useState } from "react";
import { Encrypter } from "../lib/Encrypter";
import { Users } from "../lib/Users";
import { appContext } from "./ContextApp";

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { savePage } = useContext(appContext);

  function changeView() {
    savePage("login");
  }

  async function sendRegister(ev) {
    ev.preventDefault();
    console.log(ev);
    setUsername(Encrypter.encryptAES(ev.target.elements.username_inp.value));
    setPassword(Encrypter.encryptAES(ev.target.elements.password_inp.value));
    let user = new Users(username, password);
  }

  return (
    <div className="login-container">
      <div className="row">
        <div className="display-4 text-center mb-3 fw-bold">Register</div>
      </div>
      <form onSubmit={sendRegister} id="loginForm" action="#">
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
          <div className="col-sm-6">
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-success fs-4">
                Success
              </button>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="d-grid gap-2">
              <button
                type="button"
                onClick={changeView}
                className="btn btn-info fs-4"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}