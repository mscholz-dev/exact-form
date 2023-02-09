import React, {
  useState,
  FC,
  SyntheticEvent,
} from "react";
import { toast } from "react-toastify";
import IconFont from "../../../public/icons/font.svg";
import IconTimezone from "../../../public/icons/timezone.svg";
import FormInput from "./FormInput";
import FormPage from "./FormPage";
import useTranslation from "next-translate/useTranslation";
import { AxiosError } from "axios";
import FormValidatorClass from "../../../utils/validators/FormValidator";
import FormClass from "../../../utils/Form";
import BtnLoader from "../BtnLoader";
import timezone from "../../../utils/timezone.json";
import FormApi from "../../../pages/api/form";
import { useRouter } from "next/router";
import LinkHelperClass from "../../../utils/LinkHelper";

// types
import {
  TLocale,
  TFormCreationForm,
} from "../../../utils/types";
import FormSelect from "./FormSelect";

// classes
const FormValidator = new FormValidatorClass();
const Form = new FormClass();
const LinkHelper = new LinkHelperClass();

const FormFormCreation: FC<TLocale> = ({
  locale,
}) => {
  const { t } = useTranslation();

  const router = useRouter();

  const [form, setForm] =
    useState<TFormCreationForm>({
      name: "",
      timezone: "",
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
      FormValidator.inspectCreationData(form, t);

    if (errors.length) {
      for (const { key, message } of errors) {
        FormValidator.errorStyle(key);
        toast.error(message);
      }

      setLoading(false);
      return;
    }

    try {
      await FormApi.create(form);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage =
          FormValidator.errorApiMessage(
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

    router.push(
      LinkHelper.translate(locale, "form"),
    );
  };

  return (
    <FormPage>
      <>
        <h1 className="form-page-title">
          {t("form-page-creation:form:title")}
        </h1>
        <p className="form-page-subtitle">
          {t("form:subtitle:mandatory")}
        </p>

        <form
          method="POST"
          onSubmit={handleSubmit}
        >
          <FormInput
            icon={<IconFont />}
            id="name"
            handleChange={(e) =>
              Form.handleChange(
                e,
                "name",
                setForm,
                form,
              )
            }
            value={form.name}
            ariaDescribedby={t(
              "form:input:formName:ariaDescribedby",
            )}
            title={t("form:input:formName:title")}
            mb
            maxLength={60}
            type="text"
          />

          <FormSelect
            icon={<IconTimezone />}
            id="timezone"
            defaultTitle={t(
              "form:input:timezone:title",
            )}
            ariaDescribedby={t(
              "form:input:timezone:ariaDescribedby",
            )}
            options={timezone}
            handleChange={(e) =>
              Form.handleChange(
                e,
                "timezone",
                setForm,
                form,
              )
            }
            value={form.timezone}
          />

          <BtnLoader
            loading={loading}
            text={t(
              "form-page-creation:form:submit",
            )}
          />
        </form>
      </>
    </FormPage>
  );
};

export default FormFormCreation;
