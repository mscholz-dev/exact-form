import Validator from "./Validator";
import type { Translate } from "next-translate";
import RegexClass from "../Regex";

// types
import {
  TSignupForm,
  TInspectDataErrors,
  TSigninForm,
  TProfileForm,
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

  inspectProfileData(
    schema: TProfileForm,
    t: Translate,
  ) {
    const errors = this.inspectData(
      schema,
      this.errorMessage,
      t,
    );

    this.checkChangePasswords(errors, schema, t);

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
          "form:input:password:error:match",
        ),
      });
    }

    return errors;
  }

  checkChangePasswords(
    errors: TInspectDataErrors,
    { newPassword, newPassword2 }: TProfileForm,
    t: Translate,
  ) {
    if (newPassword !== newPassword2) {
      errors.push({
        key: "newPassword2",
        message: t(
          "form:input:password:new:error:match",
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
            "form:input:username:error:empty",
          );
        if (value.length > 60)
          return t(
            "form:input:username:error:long",
          );
        return "";

      // email
      case "email":
        if (!value)
          return t(
            "form:input:email:error:empty",
          );
        if (value.length > 255)
          return t("form:input:email:error:long");
        if (!Regex.email(value))
          return t(
            "form:input:email:error:format",
          );
        return "";

      // password
      case "password":
        if (!value)
          return t(
            "form:input:password:error:empty",
          );
        if (value.length > 60)
          return t(
            "form:input:password:error:long",
          );
        return "";

      // password2
      case "password2":
        if (!value)
          return t(
            "form:input:password2:error:empty",
          );
        if (value.length > 60)
          return t(
            "form:input:password2:error:long",
          );
        return "";

      // oldPassword
      case "oldPassword":
        if (!value)
          return t(
            "form:input:oldPassword:error:empty",
          );
        if (value.length > 60)
          return t(
            "form:input:oldPassword:error:long",
          );
        return "";

      // newPassword
      case "newPassword":
        if (!value)
          return t(
            "form:input:newPassword:error:empty",
          );
        if (value.length > 60)
          return t(
            "form:input:newPassword:error:long",
          );
        return "";

      // newPassword2
      case "newPassword2":
        if (!value)
          return t(
            "form:input:newPassword2:error:empty",
          );
        if (value.length > 60)
          return t(
            "form:input:newPassword2:error:long",
          );
        return "";

      // message
      case "message":
        if (!value)
          return t(
            "form:input:message:error:empty",
          );
        if (value.length > 10_000)
          return t(
            "form:input:message:error:long",
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
