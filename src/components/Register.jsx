import { useContext, useState } from "react";
import { Encrypter } from "../lib/Encrypter";
import { Users } from "../lib/Users";
import { appContext } from "./ContextApp";
import { socketContext } from "./ContextSocket";

export function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { savePage } = useContext(appContext);
  const { setRequest } = useContext(socketContext);

  function changeView() {
    savePage("login");
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

  async function sendRegister(ev) {
    ev.preventDefault();
    let user = new Users(username, password);
    let response = await user.register();
    if (response.err) {
      alert("Error: " + response.err);
    } else {
      switch (response.res) {
        case 500:
          alert("Can't register that user, it exists or password is wrong.");
          break;
        case 200:
          sessionStorage.setItem("user", response.id);
          setRequest({ req: "getHrUsers", fields: {} });
          savePage("main");
          break;

        default:
          break;
      }
    }
  }

  return (
    <div className="container align-middle d-flex justify-content-center">
      <div className="col-12">
        <div className="row">
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
                      onInput={handleInput}
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
                      onInput={handleInput}
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
        </div>
      </div>
    </div>
  );
}
