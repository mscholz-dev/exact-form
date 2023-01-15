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
import UserValidatorClass from "../../../utils/UserValidator";
import FormClass from "../../../utils/Form";

// types
import { TSigninForm } from "../../../utils/type";

// classes
const UserValidator = new UserValidatorClass();
const Form = new FormClass();

const FormSignin: FC = () => {
  const { t } = useTranslation("signin");

  const router = useRouter();

  const [form, setForm] = useState<TSigninForm>({
    email: "",
    password: "",
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
      await UserApi.connect(form);
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
      const errorMessage = t(
        "common:form:error:random",
      );
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
          {t("common:form:subtitle:mandatory")}
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
              "common:form:input:email:ariaDescribedby",
            )}
            title={t(
              "common:form:input:email:title",
            )}
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
              "common:form:input:password:ariaDescribedby",
            )}
            title={t(
              "common:form:input:password:title",
            )}
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
