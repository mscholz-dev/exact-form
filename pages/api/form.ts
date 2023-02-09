import api from "./index";

// types
import { TFormCreationForm } from "../../utils/types";

export default class FormApi {
  static async create(form: TFormCreationForm) {
    return await api
      .post(`/form`, form, {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
          accept: "application/json",
        },
      })
      .then((res) => res);
  }

  static async getAll() {
    return await api
      .get(`/form`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => res);
  }
}
