import Validator from "./Validator";
import type { Translate } from "next-translate";
import timezone from "../timezone.json";

// types
import {
  TFormCreationForm,
  TFormUpdateFormData,
} from "../types";

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

  inspectUpdateFormData(
    schema: TFormUpdateFormData,
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
      case "timezone":
        if (!value)
          return t(
            "form:input:timezone:error:empty",
          );
        if (
          !timezone.some(
            ({ name }) => name === value,
          )
        )
          return t(
            "form:input:timezone:error:invalid",
          );
        return "";

      // locale
      case "locale":
        if (!value)
          return t("form:locale:error:empty");
        if (value !== "fr" && value !== "en")
          return t("form:locale:error:format");
        return "";

      // default
      default:
        return t("form:error:random");
    }
  }
}
