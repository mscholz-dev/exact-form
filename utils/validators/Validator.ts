import type { Translate } from "next-translate";

// types
import {
  TInspectDataErrors,
  TInspectData,
} from "../type";

export default class Validator {
  inspectData(
    schema: TInspectData,
    validFunc: Function,
    t: Translate,
  ): TInspectDataErrors {
    const errors: TInspectDataErrors = [];

    Object.entries(schema).forEach((item) => {
      const errorMessage = validFunc(
        item[0],
        item[1],
        t,
      );

      if (errorMessage.length !== 0) {
        errors.push({
          key: item[0],
          message: errorMessage,
        });
      }
    });

    return errors;
  }

  errorApiMessage(
    message: string,
    t: Translate,
  ): string {
    switch (message) {
      // username
      case "username required":
        return t(
          "form:input:username:error:empty",
        );

      case "username too long":
        return t(
          "form:input:username:error:long",
        );

      case "username already exists":
        return t(
          "form:input:username:error:exists",
        );

      // email
      case "email required":
        return t("form:input:email:error:empty");

      case "email too long":
        return t("form:input:email:error:long");

      case "email invalid":
        return t("form:input:email:error:format");

      case "email already exists":
        return t("form:input:email:error:exists");

      case "user not found":
        return t("form:input:email:error:found");

      // newEmail
      case "newEmail required":
        return t(
          "form:input:newEmail:error:empty",
        );

      case "newEmail too long":
        return t(
          "form:input:newEmail:error:long",
        );

      case "newEmail invalid":
        return t(
          "form:input:newEmail:error:format",
        );

      case "newEmail must be different":
        return t(
          "form:input:newEmail:error:different",
        );

      // newEmail2
      case "newEmail2 required":
        return t(
          "form:input:newEmail2:error:empty",
        );

      case "newEmail2 too long":
        return t(
          "form:input:newEmail2:error:long",
        );

      case "newEmail2 invalid":
        return t(
          "form:input:newEmail2:error:format",
        );

      // newEmails
      case "newEmails not matching":
        return t(
          "form:input:newEmail2:error:match",
        );

      // password
      case "password required":
        return t(
          "form:input:password:error:empty",
        );

      case "password too long":
        return t(
          "form:input:password:error:long",
        );

      case "password incorrect":
        return t(
          "form:input:password:error:incorrect",
        );

      // password2
      case "password2 required":
        return t(
          "form:input:password2:error:empty",
        );

      case "password2 too long":
        return t(
          "form:input:password2:error:long",
        );

      // passwords
      case "passwords not matching":
        return t(
          "form:input:password:error:match",
        );

      // oldPassword
      case "oldPassword too long":
        return t(
          "form:input:oldPassword:error:long",
        );

      case "oldPassword incorrect":
        return t(
          "form:input:oldPassword:error:incorrect",
        );

      // newPassword
      case "newPassword required":
        return t(
          "form:input:newPassword:error:empty",
        );

      case "newPassword too long":
        return t(
          "form:input:newPassword:error:long",
        );

      // newPassword2
      case "newPassword2 required":
        return t(
          "form:input:newPassword2:error:empty",
        );

      case "newPassword2 too long":
        return t(
          "form:input:newPassword2:error:long",
        );

      // newPasswords
      case "newPasswords not matching":
        return t(
          "form:input:password:new:error:match",
        );

      // lastName
      case "lastName required":
        return t(
          "form:input:lastName:error:empty",
        );

      case "lastName too long":
        return t(
          "form:input:lastName:error:long",
        );

      // firstName
      case "firstName required":
        return t(
          "form:input:firstName:error:empty",
        );

      case "firstName too long":
        return t(
          "form:input:firstName:error:long",
        );

      // phone
      case "phone invalid":
        return t("form:input:phone:error:format");

      // message
      case "message required":
        return t(
          "form:input:message:error:empty",
        );

      case "message too long":
        return t("form:input:message:error:long");

      // locale
      case "locale required":
        return t("form:locale:error:empty");

      case "locale invalid":
        return t("form:locale:error:format");

      // cookie
      case "user cookie not found":
        return t("form:cookie:error:found");

      case "user cookie invalid":
        return t("form:cookie:error:invalid");

      // token
      case "token required":
        return t("form:error:random");

      case "token already exists":
        return t("form:token:error:exists");

      case "token not found":
        return t("form:token:error:found");

      // formName
      case "formName required":
        return t(
          "form:input:formName:error:empty",
        );

      case "formName too long":
        return t(
          "form:input:formName:error:long",
        );

      // timezone
      case "timezone required":
        return t(
          "form:input:timezone:error:empty",
        );

      case "timezone invalid":
        return t(
          "form:input:timezone:error:invalid",
        );

      // default
      default:
        return t("form:error:random");
    }
  }

  errorStyle(id: string): void {
    const inputWrapper = document.querySelector(
      `#${id}`,
    );

    if (!inputWrapper?.parentElement) return;

    inputWrapper.parentElement.classList.add(
      "form-input-error",
    );
  }

  formatPhone(string: string): string {
    return string
      .replace("+33", "0")
      .split(" ")
      .join("");
  }
}
