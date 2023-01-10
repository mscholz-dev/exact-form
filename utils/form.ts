import type { Translate } from "next-translate";
import { emailRegex } from "./email";
import { phoneRegex } from "./phone";

export const handleValidator = (
  id: string,
  value: string,
  t: Translate,
): string => {
  switch (id) {
    case "username":
      if (!value.length)
        return t(
          "common:form:input:username:error:empty",
        );
      if (value.length > 60)
        return t(
          "common:form:input:username:error:long",
        );
      return "";

    case "email":
      if (!value.length)
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

    case "password":
      if (!value.length)
        return t(
          "common:form:input:password:error:empty",
        );
      if (value.length > 60)
        return t(
          "common:form:input:password:error:long",
        );
      return "";

    case "password2":
      if (!value.length)
        return t(
          "common:form:input:password2:error:empty",
        );
      if (value.length > 60)
        return t(
          "common:form:input:password2:error:long",
        );
      return "";

    case "lastName":
      if (!value.length)
        return t(
          "common:form:input:lastName:error:empty",
        );
      if (value.length > 60)
        return t(
          "common:form:input:lastName:error:long",
        );
      return "";

    case "firstName":
      if (!value.length)
        return t(
          "common:form:input:firstName:error:empty",
        );
      if (value.length > 60)
        return t(
          "common:form:input:firstName:error:long",
        );
      return "";

    case "phone":
      if (
        value.length !== 0 &&
        !phoneRegex.test(value)
      )
        return t(
          "common:form:input:phone:error:format",
        );
      return "";

    case "message":
      if (!value.length)
        return t(
          "common:form:input:message:error:empty",
        );
      if (value.length > 10_000)
        return t(
          "common:form:input:message:error:long",
        );
      return "";

    default:
      return "error";
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
