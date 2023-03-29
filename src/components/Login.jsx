import { useState } from "react";

export function Login() {
  return (
    <div className="login-container">
      <div className="row">
        <div className="display-4 text-center mb-3 fw-bold">Login</div>
      </div>
      <form id="loginForm" action="#">
        <div className="row">
          <div className="col-sm-6">
            <div className="mb-3">
              <label for="username-inp" className="form-label fs-4 fw-medium">
                Username
              </label>
              <input
                type="text"
                class="form-control fs-4"
                id="username-inp"
                placeholder="Type here!"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb-3">
              <label for="password-inp" className="form-label fs-4 fw-medium">
                Password
              </label>
              <input
                type="password"
                className="form-control fs-4"
                id="password-inp"
                placeholder="Type here!"
              />
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <button type="button" className="btn btn-success fs-4">
            Success
          </button>
        </div>
      </form>
    </div>
  );
}
