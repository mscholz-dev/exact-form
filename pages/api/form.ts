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

  static async getAll(currentPage: number) {
    return await api
      .get(`/form?page=${currentPage}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => res);
  }

  static async getSpecificForm(
    key: string,
    currentPage: number,
  ) {
    return await api
      .get(`/form/${key}?page=${currentPage}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => res);
  }

  static async deleteItem(
    key: string,
    id: string,
  ) {
    return await api
      .delete(`/form/${key}/${id}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => res);
  }

  static async deleteManyItem(
    key: string,
    ids: string,
  ) {
    return await api
      .delete(`/form/${key}/items?${ids}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => res);
  }

  static async editItem(
    key: string,
    id: string,
    data: Record<string, string>,
  ) {
    return await api
      .put(`/form/${key}/${id}`, data, {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => res);
  }

  static async deleteForm(key: string) {
    return await api
      .delete(`/form/${key}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => res);
  }
}
