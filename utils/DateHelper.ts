import moment from "moment";
import "moment/min/locales.min";

export default class DateHelper {
  parseCreatedAt(
    date: string | Date,
    locale: string,
  ) {
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

    return moment(new Date(date)).format(
      "HH:mm:ss - DD/MM",
    );
  }
}
