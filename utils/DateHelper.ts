import moment from "moment";
import "moment/min/locales.min";

export default class DateHelper {
  parseCreatedAt(date: string, locale: string) {
    switch (locale) {
      case "en":
        moment.locale("en");
        break;

      case "fr":
        moment.locale("fr");
        break;

      default:
        moment.locale("en");
        break;
    }

    return moment(date).format("HH:mm, DD MMMM");
  }
}