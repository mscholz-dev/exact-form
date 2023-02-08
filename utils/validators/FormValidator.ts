import Validator from "./Validator";
import type { Translate } from "next-translate";

// types
import { TFormCreationForm } from "../type";

export default class FormValidator extends Validator {
  inspectCreationData(
    schema: TFormCreationForm,
    t: Translate,
  ) {
    const errors = this.inspectData(
      schema,
      this.errorMessage,
      t,
    );

    return errors;
  }

  errorMessage(
    id: string,
    value: string,
    t: Translate,
  ): string {
    switch (id) {
      // name
      case "name":
        if (!value)
          return t(
            "form:input:formName:error:empty",
          );
        if (value.length > 60)
          return t(
            "form:input:formName:error:long",
          );
        return "";

      // timezone

      // default
      default:
        return t("form:error:random");
    }
  }
}
