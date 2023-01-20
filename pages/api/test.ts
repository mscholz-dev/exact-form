import api from "./index";

export default class TestApi {
  static async reset() {
    return await api
      .post(
        `/test/reset`,
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
