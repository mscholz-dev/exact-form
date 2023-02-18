import React, {
  useState,
  FC,
  SyntheticEvent,
} from "react";
import { toast } from "react-toastify";
import IconEmail from "../../../public/icons/email.svg";
import FormInput from "./FormInput";
import FormPage from "./FormPage";
import useTranslation from "next-translate/useTranslation";
import UserApi from "../../../pages/api/user";
import { AxiosError } from "axios";
import UserValidatorClass from "../../../utils/validators/UserValidator";
import FormClass from "../../../utils/Form";
import BtnLoader from "../BtnLoader";
import { useRouter } from "next/router";
import LinkHelperClass from "../../../utils/LinkHelper";

// types
import { TChangeEmailForm } from "../../../utils/types";

// interfaces
import { IFormChangeEmail } from "../../../utils/interfaces";

// classes
const UserValidator = new UserValidatorClass();
const Form = new FormClass();
const LinkHelper = new LinkHelperClass();

const FormChangeEmail: FC<IFormChangeEmail> = ({
  email,
  locale,
  token,
}) => {
  const { t } = useTranslation();

  const router = useRouter();

  const defaultForm = {
    newEmail: "",
    newEmail2: "",
    locale,
    token,
  };

  const [form, setForm] =
    useState<TChangeEmailForm>(defaultForm);
  const [loading, setLoading] =
    useState<boolean>(false);

  const handleSubmit = async (
    e: SyntheticEvent,
  ) => {
    e.preventDefault();

    if (email === form.newEmail) return;

    // prevent spamming
    if (loading) return;

    setLoading(true);

    const errors =
      UserValidator.inspectChangeEmail(
        form,
        t,
        email,
      );

    if (errors.length) {
      for (const { key, message } of errors) {
        UserValidator.errorStyle(key);
        toast.error(message);
      }

      setLoading(false);
      return;
    }

    try {
      await UserApi.updateEmail(form);

      // redirect to profil
      LinkHelper.redirect(
        null,
        router,
        locale,
        "profile",
      );

      return;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage =
          UserValidator.errorApiMessage(
            err?.response?.data.message,
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
  };

  return (
    <FormPage>
      <>
        <h1 className="form-page-title form-page-title-margin">
          {t("change-email:form:title")}
        </h1>

        <form
          method="PUT"
          onSubmit={handleSubmit}
        >
          <FormInput
            icon={<IconEmail />}
            id="newEmail"
            handleChange={(e) =>
              Form.handleChange(
                e,
                "newEmail",
                setForm,
                form,
              )
            }
            value={form.newEmail}
            ariaDescribedby={t(
              "form:input:newEmail:ariaDescribedby",
            )}
            title={t("form:input:newEmail:title")}
            maxLength={255}
            type="email"
            mb
          />

          <FormInput
            icon={<IconEmail />}
            id="newEmail2"
            handleChange={(e) =>
              Form.handleChange(
                e,
                "newEmail2",
                setForm,
                form,
              )
            }
            value={form.newEmail2}
            ariaDescribedby={t(
              "form:input:newEmail2:ariaDescribedby",
            )}
            title={t(
              "form:input:newEmail2:title",
            )}
            maxLength={255}
            type="email"
          />

          <BtnLoader
            loading={loading}
            text={t("change-email:form:submit")}
            disabled={email === form.newEmail}
          />
        </form>
      </>
    </FormPage>
  );
};

export default FormChangeEmail;
