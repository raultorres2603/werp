import CryptoJS from "crypto-js";

export class Encrypter {
  constructor() {}

  static encryptAES(text) {
    let encryptedText = CryptoJS.SHA256(text).toString();
    return encryptedText;
  }
}
