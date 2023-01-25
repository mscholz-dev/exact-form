import api from "./index";

export default class AuthApi {
  static async index(cookie: string | undefined) {
    return await api
      .get(`/auth`, {
        headers: {
          accept: "application/json",
          cookie,
        },
      })
      .then((res) => res);
  }
}
