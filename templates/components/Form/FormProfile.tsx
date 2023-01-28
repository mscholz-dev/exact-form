import React, {
  useState,
  FC,
  useEffect,
  SyntheticEvent,
} from "react";
import { toast } from "react-toastify";
import IconUser from "../../../public/icons/user.svg";
import IconPassword from "../../../public/icons/password.svg";
import IconEmail from "../../../public/icons/email.svg";
import IconRole from "../../../public/icons/role.svg";
import IconEdit from "../../../public/icons/edit.svg";
import FormInput from "./FormInput";
import FormPage from "./FormPage";
import useTranslation from "next-translate/useTranslation";
// import ContactApi from "../../../pages/api/contact";
import { AxiosError } from "axios";
import UserValidatorClass from "../../../utils/validator/UserValidator";
import FormClass from "../../../utils/Form";

// types
import {
  TCookie,
  TProfileForm,
} from "../../../utils/type";

// classes
const UserValidator = new UserValidatorClass();
const Form = new FormClass();

const FormProfile: FC<TCookie> = ({
  username,
  email,
  role,
}) => {
  const { t } = useTranslation("contact");

  const defaultForm = {
    username: "",
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
  };

  const [form, setForm] =
    useState<TProfileForm>(defaultForm);

  const handleSubmit = async (
    e: SyntheticEvent,
  ) => {
    e.preventDefault();

    const errors =
      UserValidator.inspectProfileData(form, t);

    if (errors.length) {
      for (const { key, message } of errors) {
        UserValidator.errorStyle(key);
        toast.error(message);
      }

      return;
    }

    toast.success("OK");

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
    //     return;
    //   }

    //   // error not expected
    //   console.error(err);
    //   const errorMessage = t(
    //     "form:error:random",
    //   );
    //   toast.error(errorMessage);
    // }
  };

  const handleChangeEmail = () => {
    try {
      // call API

      const successMessage = t(
        "profile:form:change:email:success",
      );
      toast.success(successMessage);
    } catch (err: unknown) {
      // if (err instanceof AxiosError) {
      //   const errorMessage =
      //     ContactValidator.errorApiMessage(
      //       err?.response?.data.message,
      //       t,
      //     );
      //   toast.error(errorMessage);
      //   return;
      // }
      // error not expected
      console.error(err);
      const errorMessage = t("form:error:random");
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    setForm({
      ...form,
      username,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return (
    <FormPage>
      <>
        <h1 className="form-page-title form-page-title-margin">
          {t("profile:form:title")}
        </h1>

        <form
          method="PUT"
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
            title={t(
              "form:input:username:edit:title",
            )}
            mb
            maxLength={60}
            type="text"
          />

          <div className="form-page-change-email">
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
              value={email}
              ariaDescribedby={t(
                "form:input:email:ariaDescribedby",
              )}
              title={t("form:input:email:title")}
              maxLength={255}
              type="email"
              readOnly
            />

            <button
              type="button"
              className="btn-edit"
              onClick={handleChangeEmail}
            >
              <IconEdit />
            </button>
          </div>

          <FormInput
            icon={<IconRole />}
            id="role"
            handleChange={() => {}}
            value={role}
            ariaDescribedby={t(
              "form:input:role:ariaDescribedby",
            )}
            title={t("form:input:role:title")}
            mb
            maxLength={60}
            type="text"
            readOnly
          />

          <h2 className="form-page-title-two">
            {t("form:subtitle:changePassword")}
          </h2>

          <FormInput
            icon={<IconPassword />}
            id="oldPassword"
            handleChange={(e) =>
              Form.handleChange(
                e,
                "oldPassword",
                setForm,
                form,
              )
            }
            value={form.oldPassword}
            ariaDescribedby={t(
              "form:input:password:ariaDescribedby",
            )}
            title={t(
              "form:input:password:edit:old:title",
            )}
            mb
            maxLength={60}
            type="password"
          />

          <FormInput
            icon={<IconPassword />}
            id="newPassword"
            handleChange={(e) =>
              Form.handleChange(
                e,
                "newPassword",
                setForm,
                form,
              )
            }
            value={form.newPassword}
            ariaDescribedby={t(
              "form:input:password:ariaDescribedby",
            )}
            title={t(
              "form:input:password:edit:new:title",
            )}
            mb
            maxLength={60}
            type="password"
          />

          <FormInput
            icon={<IconPassword />}
            id="newPassword2"
            handleChange={(e) =>
              Form.handleChange(
                e,
                "newPassword2",
                setForm,
                form,
              )
            }
            value={form.newPassword2}
            ariaDescribedby={t(
              "form:input:password:ariaDescribedby",
            )}
            title={t(
              "form:input:password:edit:new2:title",
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
            {t("profile:form:submit")}
          </button>
        </form>
      </>
    </FormPage>
  );
};

export default FormProfile;
