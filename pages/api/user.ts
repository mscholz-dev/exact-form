import api from "./index";

// types
import {
  TSignupForm,
  TSigninForm,
} from "../../utils/type";

export default class UserApi {
  static async create(form: TSignupForm) {
    return await api
      .post(`/user/create`, form, {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
          accept: "application/json",
        },
      })
      .then((res) => res);
  }

  static async connect(form: TSigninForm) {
    return await api
      .post(`/user/connect`, form, {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
          accept: "application/json",
        },
      })
      .then((res) => res);
  }
}
