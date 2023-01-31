import api from "./index";

// types
import {
  TSignupForm,
  TSigninForm,
  TProfileForm,
  TLocale,
  TChangeEmailForm,
} from "../../utils/type";

export default class UserApi {
  static async create(form: TSignupForm) {
    return await api
      .post(`/user`, form, {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
          accept: "application/json",
        },
      })
      .then((res) => res);
  }

  static async connection(form: TSigninForm) {
    return await api
      .post(`/user/connection`, form, {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
          accept: "application/json",
        },
      })
      .then((res) => res);
  }

  static async update(form: TProfileForm) {
    return await api
      .put(`/user`, form, {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
          accept: "application/json",
        },
      })
      .then((res) => res);
  }

  static async createEmailToken(form: TLocale) {
    return await api
      .post(`/user/email`, form, {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
          accept: "application/json",
        },
      })
      .then((res) => res);
  }

  static async updateEmail(
    form: TChangeEmailForm,
  ) {
    return await api
      .put(`/user/email`, form, {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
          accept: "application/json",
        },
      })
      .then((res) => res);
  }
}
