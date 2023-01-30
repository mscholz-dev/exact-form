import React, {
  useState,
  FC,
  SyntheticEvent,
} from "react";
import { toast } from "react-toastify";
import IconEmail from "../../../public/icons/email.svg";
import FormInput from "./FormInput";
import IconPassword from "../../../public/icons/password.svg";
import { useRouter } from "next/router";
import FormPage from "./FormPage";
import useTranslation from "next-translate/useTranslation";
import UserApi from "../../../pages/api/user";
import { AxiosError } from "axios";
import UserValidatorClass from "../../../utils/validator/UserValidator";
import FormClass from "../../../utils/Form";

// types
import {
  TLocale,
  TSigninForm,
} from "../../../utils/type";

// classes
const UserValidator = new UserValidatorClass();
const Form = new FormClass();

const FormSignin: FC<TLocale> = ({ locale }) => {
  const { t } = useTranslation();

  const router = useRouter();

  const [form, setForm] = useState<TSigninForm>({
    email: "",
    password: "",
    locale,
  });

  const handleSubmit = async (
    e: SyntheticEvent,
  ) => {
    e.preventDefault();

    const errors =
      UserValidator.inspectSigninData(form, t);

    if (errors.length) {
      for (const { key, message } of errors) {
        UserValidator.errorStyle(key);
        toast.error(message);
      }

      return;
    }

    try {
      await UserApi.connection(form);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage =
          UserValidator.errorApiMessage(
            err.response?.data.message,
            t,
          );

        toast.error(errorMessage);
        return;
      }

      // error not expected
      console.error(err);
      const errorMessage = t("form:error:random");
      toast.error(errorMessage);
    }

    router.push("/");
  };

  return (
    <FormPage>
      <>
        <h1 className="form-page-title">
          {t("signin:form:title")}
        </h1>
        <p className="form-page-subtitle">
          {t("form:subtitle:mandatory")}
        </p>

        <form
          method="POST"
          onSubmit={handleSubmit}
        >
          <FormInput
            icon={<IconEmail />}
            id="email"
            handleChange={(e) =>
              Form.handleChange(
                e,
                "email",
                setForm,
                form,
              )
            }
            value={form.email}
            ariaDescribedby={t(
              "form:input:email:ariaDescribedby",
            )}
            title={t("form:input:email:title")}
            mb
            maxLength={255}
            type="email"
          />

          <FormInput
            icon={<IconPassword />}
            id="password"
            handleChange={(e) =>
              Form.handleChange(
                e,
                "password",
                setForm,
                form,
              )
            }
            value={form.password}
            ariaDescribedby={t(
              "form:input:password:ariaDescribedby",
            )}
            title={t("form:input:password:title")}
            mb
            maxLength={60}
            type="password"
          />

          <button
            type="submit"
            className="btn-submit"
            data-cy="btn-form"
          >
            {t("signin:form:submit")}
          </button>
        </form>
      </>
    </FormPage>
  );
};

export default FormSignin;
