import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

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
}
