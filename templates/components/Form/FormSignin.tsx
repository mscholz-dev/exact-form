import React, {
  useState,
  FC,
  SyntheticEvent,
  ChangeEvent,
} from "react";
import { toast } from "react-toastify";
import IconEmail from "../../../public/icons/email.svg";
import FormInput from "./FormInput";
import IconPassword from "../../../public/icons/password.svg";
import { useRouter } from "next/router";
import FormPage from "./FormPage";
import useTranslation from "next-translate/useTranslation";
import {
  handleValidator,
  handleErrorStyle,
} from "../../../utils/Validator";

type Form = {
  email: string;
  password: string;
};

const FormSignin: FC = () => {
  const { t } = useTranslation("signin");

  const router = useRouter();

  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
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

    let error = false;

    Object.entries(form).forEach((item) => {
      const errorMessage = handleValidator(
        item[0],
        item[1],
        t,
      );
      if (errorMessage.length !== 0) {
        error = true;
        handleErrorStyle(item[0]);
        toast.error(errorMessage);
      }
    });

    if (error) return;

    //TODO: add api call

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

          <button
            type="submit"
            className="btn-submit"
          >
            {t("signin:form:submit")}
          </button>
        </form>
      </>
    </FormPage>
  );
};

export default FormSignin;
