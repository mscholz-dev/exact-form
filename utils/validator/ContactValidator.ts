import Validator from "./Validator";
import type { Translate } from "next-translate";
import RegexClass from "../Regex";

// types
import { TContactForm } from "../type";

// classes
const Regex = new RegexClass();

export default class ContactValidator extends Validator {
  inspectContactData(
    schema: TContactForm,
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
  ) {
    switch (id) {
      // lastName
      case "lastName":
        if (!value)
          return t(
            "common:form:input:lastName:error:empty",
          );
        if (value.length > 60)
          return t(
            "common:form:input:lastName:error:long",
          );
        return "";

      // firstName
      case "firstName":
        if (!value)
          return t(
            "common:form:input:firstName:error:empty",
          );
        if (value.length > 60)
          return t(
            "common:form:input:firstName:error:long",
          );
        return "";

      // email
      case "email":
        if (!value)
          return t(
            "common:form:input:email:error:empty",
          );
        if (value.length > 255)
          return t(
            "common:form:input:email:error:long",
          );
        if (!Regex.email(value))
          return t(
            "common:form:input:email:error:format",
          );
        return "";

      // phone
      case "phone":
        if (value && !Regex.phone(value))
          return t(
            "common:form:input:phone:error:format",
          );
        return "";

      // message
      case "message":
        if (!value)
          return t(
            "common:form:input:message:error:empty",
          );
        if (value.length > 10_000)
          return t(
            "common:form:input:message:error:long",
          );
        return "";

      // default
      default:
        return t("common:form:error:random");
    }
  }
}
