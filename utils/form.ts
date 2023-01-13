import type { Translate } from "next-translate";
import { emailRegex } from "./email";
import { phoneRegex } from "./phone";

export const handleValidator = (
  id: string,
  value: string,
  t: Translate,
): string => {
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
      if (!emailRegex.test(value))
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

    // phone
    case "phone":
      if (value && !phoneRegex.test(value))
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
};

export const handleError = (
  message: string,
  t: Translate,
): string => {
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
};

export const handleErrorStyle = (
  id: string,
): void => {
  const inputWrapper = document.querySelector(
    `#${id}`,
  );

  if (!inputWrapper?.parentElement) return;

  inputWrapper.parentElement.classList.add(
    "form-input-error",
  );
};
