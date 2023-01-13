import React, {
  useState,
  FC,
  SyntheticEvent,
  ChangeEvent,
} from "react";
import { toast } from "react-toastify";
import IconUser from "../../../public/icons/user.svg";
import IconEmail from "../../../public/icons/email.svg";
import FormInput from "./FormInput";
import IconPassword from "../../../public/icons/password.svg";
import { useRouter } from "next/router";
import FormPage from "./FormPage";
import useTranslation from "next-translate/useTranslation";
import UserApi from "../../../pages/api/user";
import { AxiosError } from "axios";
import UserValidatorClass from "../../../utils/UserValidator";

// class
const UserValidator = new UserValidatorClass();

type Form = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

const FormSignup: FC = () => {
  const { t } = useTranslation("signup");

  const router = useRouter();

  const [form, setForm] = useState<Form>({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (
    e: ChangeEvent,
    id: string,
  ) => {
    setForm({
      ...form,
      [id]: (e.target as HTMLInputElement).value,
    });
  };

  const handleSubmit = async (
    e: SyntheticEvent,
  ) => {
    e.preventDefault();

    const errors = UserValidator.inspectUserData(
      form,
      t,
    );

    if (errors.length) {
      for (const { key, message } of errors) {
        UserValidator.errorStyle(key);
        toast.error(message);
      }

      return;
    }

    try {
      await UserApi.create(form);
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
          {t("signup:form:title")}
        </h1>
        <p className="form-page-subtitle">
          {t("common:form:subtitle:mandatory")}
        </p>

        <form
          method="POST"
          onSubmit={handleSubmit}
        >
          <FormInput
            icon={<IconUser />}
            id="username"
            handleChange={handleChange}
            value={form.username}
            ariaDescribedby={t(
              "common:form:input:username:ariaDescribedby",
            )}
            title={t(
              "common:form:input:username:title",
            )}
            mb
            maxLength={60}
            type="text"
          />

          <FormInput
            icon={<IconEmail />}
            id="email"
            handleChange={handleChange}
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
            handleChange={handleChange}
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
          <FormInput
            icon={<IconPassword />}
            id="password2"
            handleChange={handleChange}
            value={form.password2}
            ariaDescribedby={t(
              "common:form:input:password2:ariaDescribedby",
            )}
            title={t(
              "common:form:input:password2:title",
            )}
            maxLength={60}
            type="password"
          />

          <button
            type="submit"
            className="btn-submit"
          >
            {t("signup:form:submit")}
          </button>
        </form>
      </>
    </FormPage>
  );
};

export default FormSignup;
