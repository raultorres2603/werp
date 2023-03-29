import CryptoJS from "crypto-js";

export class Encrypter {
  constructor() {}

  static encryptAES(text) {
    let encryptedText = CryptoJS.AES.encrypt(
      text,
      import.meta.env.VITE_SECRET_KEY_ENCRYPT
    ).toString();
    return encryptedText;
  }
}
