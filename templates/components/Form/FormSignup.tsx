import React, {
  useState,
  FC,
  SyntheticEvent,
  ChangeEvent,
} from "react";
// import { toast } from "react-toastify";
import IconUser from "../../../public/icons/user.svg";
import IconEmail from "../../../public/icons/email.svg";
import FormInput from "./FormInput";
import IconPassword from "../../../public/icons/password.svg";
// import { useRouter } from "next/router";
import FormPage from "./FormPage";
import useTranslation from "next-translate/useTranslation";

type Form = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

const FormSignup: FC = () => {
  const { t } = useTranslation("signup");

  // const router = useRouter();

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

    console.log("submit");
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
              "signup:form:input:username:ariaDescribedby",
            )}
            title={t(
              "signup:form:input:username:title",
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
              "signup:form:input:password2:ariaDescribedby",
            )}
            title={t(
              "signup:form:input:password2:title",
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
