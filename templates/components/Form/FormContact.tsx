import React, {
  useState,
  FC,
  SyntheticEvent,
} from "react";
import { toast } from "react-toastify";
import IconUser from "../../../public/icons/user.svg";
import IconPhone from "../../../public/icons/phone.svg";
import IconEmail from "../../../public/icons/email.svg";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormPage from "./FormPage";
import useTranslation from "next-translate/useTranslation";
import ContactApi from "../../../pages/api/contact";
import { AxiosError } from "axios";
import ContactValidatorClass from "../../../utils/validator/ContactValidator";
import FormClass from "../../../utils/Form";

// types
import {
  TContactForm,
  TLocale,
} from "../../../utils/type";

// classes
const ContactValidator =
  new ContactValidatorClass();
const Form = new FormClass();

const FormContact: FC<TLocale> = ({ locale }) => {
  const { t } = useTranslation("contact");

  const defaultForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    locale,
  };

  const [form, setForm] =
    useState<TContactForm>(defaultForm);

  const handleSubmit = async (
    e: SyntheticEvent,
  ) => {
    e.preventDefault();

    const errors =
      ContactValidator.inspectContactData(
        form,
        t,
      );

    if (errors.length) {
      for (const { key, message } of errors) {
        ContactValidator.errorStyle(key);
        toast.error(message);
      }

      return;
    }

    try {
      await ContactApi.contact(form);

      const successMessage = t(
        "contact:form:success",
      );
      toast.success(successMessage);
      setForm(defaultForm);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage =
          ContactValidator.errorApiMessage(
            err?.response?.data.message,
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
  };

  return (
    <FormPage>
      <>
        <h1 className="form-page-title">
          {t("contact:form:title")}
        </h1>
        <p className="form-page-subtitle">
          {t("form:subtitle:optional")}
        </p>

        <form
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="form-page-side">
            <FormInput
              icon={<IconUser />}
              id="lastName"
              handleChange={(e) =>
                Form.handleChange(
                  e,
                  "lastName",
                  setForm,
                  form,
                )
              }
              value={form.lastName}
              ariaDescribedby={t(
                "form:input:lastName:ariaDescribedby",
              )}
              title={t(
                "form:input:lastName:title",
              )}
              mb
              maxLength={60}
              type="text"
              asterix
            />

            <FormInput
              icon={<IconUser />}
              id="firstName"
              handleChange={(e) =>
                Form.handleChange(
                  e,
                  "firstName",
                  setForm,
                  form,
                )
              }
              value={form.firstName}
              ariaDescribedby={t(
                "form:input:firstName:ariaDescribedby",
              )}
              title={t(
                "form:input:firstName:title",
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
            asterix
          />

          <FormInput
            icon={<IconPhone />}
            id="phone"
            handleChange={(e) =>
              Form.handleChange(
                e,
                "phone",
                setForm,
                form,
              )
            }
            value={form.phone}
            ariaDescribedby={t(
              "form:input:phone:ariaDescribedby",
            )}
            title={t("form:input:phone:title")}
            mb
            maxLength={60}
            type="text"
          />

          <FormTextarea
            id="message"
            handleChange={(e) =>
              Form.handleChange(
                e,
                "message",
                setForm,
                form,
              )
            }
            value={form.message}
            ariaDescribedby={t(
              "form:input:message:ariaDescribedby",
            )}
            title={t("form:input:message:title")}
            maxLength={10_000}
            asterix
          />

          <button
            type="submit"
            className="btn-submit"
            data-cy="btn-form"
          >
            {t("contact:form:submit")}
          </button>
        </form>
      </>
    </FormPage>
  );
};

export default FormContact;
