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

// types
import {
  TFormCreationForm,
  TLocale,
} from "../../../utils/type";
import FormSelect from "./FormSelect";

// classes
const FormValidator = new FormValidatorClass();
const Form = new FormClass();

const FormFormCreation: FC<TLocale> = ({
  locale,
}) => {
  const { t } = useTranslation();

  const defaultForm = {
    name: "",
    timezone: "",
  };

  const [form, setForm] =
    useState<TFormCreationForm>(defaultForm);
  const [loading, setLoading] =
    useState<boolean>(false);

  const [timezone, setTimezone] = useState([]);

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

    // try {
    //   await ContactApi.contact(form);

    //   const successMessage = t(
    //     "contact:form:success",
    //   );
    //   toast.success(successMessage);
    //   setForm(defaultForm);
    // } catch (err: unknown) {
    //   if (err instanceof AxiosError) {
    //     const errorMessage =
    //       ContactValidator.errorApiMessage(
    //         err?.response?.data.message,
    //         t,
    //       );

    //     toast.error(errorMessage);
    //     setLoading(false);
    //     return;
    //   }

    //   // error not expected
    //   console.error(err);
    //   const errorMessage = t("form:error:random");
    //   toast.error(errorMessage);
    //   setLoading(false);
    //   return;
    // }

    setLoading(false);
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
            options={timezone}
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
