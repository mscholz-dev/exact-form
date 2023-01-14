import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

// types
import { TSignupForm } from "./type";

export default class Form {
  handleChange(
    e: ChangeEvent,
    id: string,
    setter: Dispatch<SetStateAction<TSignupForm>>,
    state: TSignupForm,
  ): void {
    setter({
      ...state,
      [id]: (e.target as HTMLInputElement).value,
    });
  }
}
