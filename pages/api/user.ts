import api from "./index";

type Create = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

export default class UserApi {
  static async create(form: Create) {
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
