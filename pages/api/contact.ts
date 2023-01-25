import api from "./index";

// types
import { TContactForm } from "../../utils/type";

export default class ContactApi {
  static async contact(form: TContactForm) {
    return await api
      .post(`/contact`, form, {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
          accept: "application/json",
        },
      })
      .then((res) => res);
  }
}
