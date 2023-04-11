import { useContext, useState } from "react";
import { Encrypter } from "../lib/Encrypter";
import { Users } from "../lib/Users";
import { appContext } from "./ContextApp";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { savePage } = useContext(appContext);

  function changeView() {
    savePage("register");
  }

  function handleInput(ev) {
    switch (ev.target.id) {
      case "username_inp":
        setUsername(Encrypter.encrypt(ev.target.value));
        break;

      case "password_inp":
        setPassword(Encrypter.encrypt(ev.target.value));
        break;

      default:
        break;
    }
  }

  async function sendLogin(ev) {
    ev.preventDefault();
    let user = new Users(username, password);
    let response = await user.login();
    if (response.err) {
      alert("Error: " + response.err);
    } else {
      switch (response.res) {
        case 500:
          alert("Can't find that user, it exists or password is wrong.");
          break;
        case 200:
          sessionStorage.setItem("user", response.id);
          savePage("main");
          break;

        default:
          break;
      }
    }
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
                onInput={handleInput}
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
                onInput={handleInput}
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
                Register
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
