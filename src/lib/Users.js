import axios from "axios";

export class Users {
  #username;
  #password;
  #type;

  constructor(username, password, type = null) {
    this.#username = username;
    this.#password = password;
    this.#type = type;
  }

  getUsername() {
    return this.#username;
  }

  getPassword() {
    return this.#password;
  }

  setUsername(username) {
    this.#username = username;
  }

  setPassword(password) {
    this.#password = password;
  }

  async login() {
    let response = await axios.post(
      `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_DOMAIN}:${
        import.meta.env.VITE_PORT
      }/users/login`,
      {
        username: this.getUsername(),
        password: this.getPassword(),
      }
    );

    return response.data;
  }

  async register() {
    let response = await axios.post(
      `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_DOMAIN}:${
        import.meta.env.VITE_PORT
      }/users/register`,
      {
        username: this.getUsername(),
        password: this.getPassword(),
      }
    );

    return response.data;
  }
}
