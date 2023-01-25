import api from "./index";

export default class TestApi {
  static async newDB() {
    return await api
      .get(
        `/test/new-db`,

        {
          headers: {
            accept: "application/json",
          },
        },
      )
      .then((res) => res);
  }
}
