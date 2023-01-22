import api from "./index";

export default class AuthApi {
  static async index() {
    return await api
      .post(
        `/auth`,
        {},
        {
          headers: {
            accept: "application/json",
          },
        },
      )
      .then((res) => res);
  }
}
