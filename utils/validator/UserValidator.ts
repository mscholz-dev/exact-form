import Validator from "./Validator";
import type { Translate } from "next-translate";
import RegexClass from "../Regex";

// types
import {
  TSignupForm,
  TInspectDataErrors,
  TSigninForm,
} from "../type";

// classes
const Regex = new RegexClass();

export default class UserValidator extends Validator {
  inspectSignupData(
    schema: TSignupForm,
    t: Translate,
  ) {
    const errors = this.inspectData(
      schema,
      this.errorMessage,
      t,
    );

    this.checkPasswords(errors, schema, t);

    return errors;
  }

  inspectSigninData(
    schema: TSigninForm,
    t: Translate,
  ) {
    const errors = this.inspectData(
      schema,
      this.errorMessage,
      t,
    );

    return errors;
  }

  checkPasswords(
    errors: TInspectDataErrors,
    { password, password2 }: TSignupForm,
    t: Translate,
  ) {
    if (password !== password2) {
      errors.push({
        key: "password2",
        message: t(
          "common:form:input:password:error:match",
        ),
      });
    }

    return errors;
  }

  errorMessage(
    id: string,
    value: string,
    t: Translate,
  ): string {
    switch (id) {
      // username
      case "username":
        if (!value)
          return t(
            "common:form:input:username:error:empty",
          );
        if (value.length > 60)
          return t(
            "common:form:input:username:error:long",
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

      // password
      case "password":
        if (!value)
          return t(
            "common:form:input:password:error:empty",
          );
        if (value.length > 60)
          return t(
            "common:form:input:password:error:long",
          );
        return "";

      // password2
      case "password2":
        if (!value)
          return t(
            "common:form:input:password2:error:empty",
          );
        if (value.length > 60)
          return t(
            "common:form:input:password2:error:long",
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