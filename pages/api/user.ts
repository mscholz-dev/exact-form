import api from "./index";

// types
import { TSignupForm } from "../../utils/type";

export default class UserApi {
  static async create(form: TSignupForm) {
    return await api
      .post(`/user`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "application/json",
        },
      })
      .then((res) => res);
  }
}
