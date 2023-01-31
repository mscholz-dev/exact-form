import api from "./index";

export default class AuthApi {
  static async index() {
    return await api
      .get(`/auth`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => res);
  }

  static async hasEmailToken(
    token: string | undefined,
  ) {
    return await api
      .get(`/auth/token/email/${token}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => res);
  }
}
