import api from "./index";

// types
import { TContactForm } from "../../utils/type";

export default class ContactApi {
  static async contact(form: TContactForm) {
    return await api
      .post(`/contact/contact`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "application/json",
        },
      })
      .then((res) => res);
  }
}
