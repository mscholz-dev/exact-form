import React, {
  useState,
  FC,
  SyntheticEvent,
  useEffect,
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
import UserValidatorClass from "../../../utils/validators/UserValidator";
import FormClass from "../../../utils/Form";
import LinkHelperClass from "../../../utils/LinkHelper";
import BtnLoader from "../BtnLoader";

// types
import {
  TSignupForm,
  TLocale,
} from "../../../utils/types";
import FormCheckbox from "./FormCheckbox";

// classes
const UserValidator = new UserValidatorClass();
const Form = new FormClass();
const LinkHelper = new LinkHelperClass();

const FormSignup: FC<TLocale> = ({ locale }) => {
  const { t } = useTranslation();

  const router = useRouter();

  const [form, setForm] = useState<TSignupForm>({
    username: "",
    email: "",
    password: "",
    password2: "",
    market: true,
    locale,
  });
  const [loading, setLoading] =
    useState<boolean>(false);

  const handleSubmit = async (
    e: SyntheticEvent,
  ) => {
    e.preventDefault();

    // prevent spamming
    if (loading) return;
    setLoading(true);

    const errors =
      UserValidator.inspectSignupData(form, t);

    if (errors.length) {
      for (const { key, message } of errors) {
        UserValidator.errorStyle(key);
        toast.error(message);
      }

      setLoading(false);
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
        setLoading(false);
        return;
      }

      // error not expected
      console.error(err);
      const errorMessage = t("form:error:random");
      toast.error(errorMessage);
      setLoading(false);
      return;
    }

    LinkHelper.redirect(null, router, locale, "");
  };

  return (
    <FormPage>
      <>
        <h1 className="form-page-title">
          {t("signup:form:title")}
        </h1>
        <p className="form-page-subtitle">
          {t("form:subtitle:mandatory")}
        </p>

        <form
          method="POST"
          onSubmit={handleSubmit}
        >
          <FormInput
            icon={<IconUser />}
            id="username"
            handleChange={(e) =>
              Form.handleChange(
                e,
                "username",
                setForm,
                form,
              )
            }
            value={form.username}
            ariaDescribedby={t(
              "form:input:username:ariaDescribedby",
            )}
            title={t("form:input:username:title")}
            mb
            maxLength={60}
            type="text"
          />
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
            regex
          />
          <FormInput
            icon={<IconPassword />}
            id="password2"
            handleChange={(e) =>
              Form.handleChange(
                e,
                "password2",
                setForm,
                form,
              )
            }
            value={form.password2}
            ariaDescribedby={t(
              "form:input:password2:ariaDescribedby",
            )}
            title={t(
              "form:input:password2:title",
            )}
            maxLength={60}
            type="password"
            mb
          />

          <FormCheckbox
            id="market"
            handleChange={(e) =>
              Form.handleCheckboxChange(
                e,
                "market",
                setForm,
                form,
              )
            }
            value={form.market}
            title={t("form:input:market:title")}
            ariaDescribedby={t(
              "form:input:market:ariaDescribedby",
            )}
          />

          <BtnLoader
            loading={loading}
            text={t("signup:form:submit")}
          />
        </form>
      </>
    </FormPage>
  );
};

export default FormSignup;
