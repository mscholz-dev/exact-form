import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { Translate } from "next-translate";

export default class Form {
  handleChange(
    e: ChangeEvent,
    id: string,
    setter: Dispatch<SetStateAction<any>>,
    state: object,
  ): void {
    setter({
      ...state,
      [id]: (e.target as HTMLInputElement).value,
    });
  }

  handleCheckboxChange(
    e: ChangeEvent,
    id: string,
    setter: Dispatch<SetStateAction<any>>,
    state: object,
  ): void {
    setter({
      ...state,
      [id]: (e.target as HTMLInputElement)
        .checked,
    });
  }
  displayRole(
    role: string,
    t: Translate,
  ): string {
    switch (role) {
      case "CLIENT":
        return t("common:role:client");

      case "ADMIN":
        return t("common:role:admin");

      case "SUPER_ADMIN":
        return t("common:role:superAdmin");

      default:
        return "";
    }
  }
}
