import axios from "axios";

export class Graphs {
  constructor() {}

  static async getGraph(from, to) {
    let response = await axios.get(
      `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_DOMAIN}:${
        import.meta.env.VITE_PORT
      }/graphs/${from}/${to}`
    );

    return response.data;
  }

  static async getDetail(date) {
    let response = await axios.get(
      `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_DOMAIN}:${
        import.meta.env.VITE_PORT
      }/graphs/details/${date}`
    );

    return response;
  }

  static getMonth(month) {
    switch (month) {
      case 1:
        return "Jan";
        break;
      case 2:
        return "Febr";
        break;
      case 3:
        return "Mar";
        break;
      case 4:
        return "Apr";
        break;
      case 5:
        return "May";
        break;
      case 6:
        return "Jun";
        break;
      case 7:
        return "Jul";
        break;
      case 8:
        return "Aug";
        break;
      case 9:
        return "Sep";
        break;
      case 10:
        return "Oct";
        break;
      case 11:
        return "Nov";
        break;
      case 12:
        return "Dec";
        break;

      default:
        break;
    }
  }
}
