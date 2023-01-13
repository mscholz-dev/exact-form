import React, {
  useState,
  FC,
  SyntheticEvent,
  ChangeEvent,
} from "react";
import { toast } from "react-toastify";
import IconUser from "../../../public/icons/user.svg";
import IconPhone from "../../../public/icons/phone.svg";
import IconEmail from "../../../public/icons/email.svg";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormPage from "./FormPage";
import useTranslation from "next-translate/useTranslation";
import {
  handleValidator,
  handleErrorStyle,
} from "../../../utils/Validator";

type Form = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

const FormContact: FC = () => {
  const { t } = useTranslation("contact");

  const defaultForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  };

  const [form, setForm] =
    useState<Form>(defaultForm);

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

    console.log(form);

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

    const successMessage = t(
      "contact:form:success",
    );
    toast.success(successMessage);
    setForm(defaultForm);
  };

  return (
    <FormPage>
      <>
        <h1 className="form-page-title">
          {t("contact:form:title")}
        </h1>
        <p className="form-page-subtitle">
          {t("common:form:subtitle:optional")}
        </p>

        <form
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="form-page-side">
            <FormInput
              icon={<IconUser />}
              id="lastName"
              handleChange={handleChange}
              value={form.lastName}
              ariaDescribedby={t(
                "common:form:input:lastName:ariaDescribedby",
              )}
              title={t(
                "common:form:input:lastName:title",
              )}
              mb
              maxLength={60}
              type="text"
              asterix
            />

            <FormInput
              icon={<IconUser />}
              id="firstName"
              handleChange={handleChange}
              value={form.firstName}
              ariaDescribedby={t(
                "common:form:input:firstName:ariaDescribedby",
              )}
              title={t(
                "common:form:input:firstName:title",
              )}
              mb
              maxLength={60}
              type="text"
              asterix
            />
          </div>

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
            asterix
          />

          <FormInput
            icon={<IconPhone />}
            id="phone"
            handleChange={handleChange}
            value={form.phone}
            ariaDescribedby={t(
              "common:form:input:phone:ariaDescribedby",
            )}
            title={t(
              "common:form:input:phone:title",
            )}
            mb
            maxLength={60}
            type="text"
          />

          <FormTextarea
            id="message"
            handleChange={handleChange}
            value={form.message}
            ariaDescribedby={t(
              "common:form:input:message:ariaDescribedby",
            )}
            title={t(
              "common:form:input:message:title",
            )}
            maxLength={10_000}
            asterix
          />

          <button
            type="submit"
            className="btn-submit"
          >
            {t("contact:form:submit")}
          </button>
        </form>
      </>
    </FormPage>
  );
};

export default FormContact;
