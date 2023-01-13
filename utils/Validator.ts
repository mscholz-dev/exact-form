import type { Translate } from "next-translate";

type InspectData = {
  username?: string;
  email?: string;
  password?: string;
  password2?: string;
};

type InspectDataErrors = {
  key: string;
  message: string;
}[];

export default class Validator {
  inspectData(
    schema: InspectData,
    validFunc: Function,
    t: Translate,
  ): InspectDataErrors {
    const errors: InspectDataErrors = [];

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
          "common:form:input:username:error:empty",
        );

      case "username too long":
        return t(
          "common:form:input:username:error:long",
        );

      case "username already exists":
        return t(
          "common:form:input:username:error:exists",
        );

      // email
      case "email required":
        return t(
          "common:form:input:email:error:empty",
        );

      case "email too long":
        return t(
          "common:form:input:email:error:long",
        );

      case "email invalid":
        return t(
          "common:form:input:email:error:format",
        );

      case "email already exists":
        return t(
          "common:form:input:email:error:exists",
        );

      // password
      case "password required":
        return t(
          "common:form:input:password:error:empty",
        );

      case "password too long":
        return t(
          "common:form:input:password:error:long",
        );

      // password2
      case "password2 required":
        return t(
          "common:form:input:password2:error:empty",
        );

      case "password2 too long":
        return t(
          "common:form:input:password2:error:long",
        );

      // passwords
      case "passwords not matching":
        return t(
          "common:form:input:password:error:match",
        );

      // lastName
      case "lastName required":
        return t(
          "common:form:input:lastName:error:empty",
        );

      case "lastName too long":
        return t(
          "common:form:input:lastName:error:long",
        );

      // firstName
      case "firstName required":
        return t(
          "common:form:input:firstName:error:empty",
        );

      case "firstName too long":
        return t(
          "common:form:input:firstName:error:long",
        );

      // phone
      case "phone invalid":
        return t(
          "common:form:input:phone:error:format",
        );

      // message
      case "message required":
        return t(
          "common:form:input:message:error:empty",
        );

      case "message too long":
        return t(
          "common:form:input:message:error:long",
        );

      // default
      default:
        return t("common:form:error:random");
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
}
