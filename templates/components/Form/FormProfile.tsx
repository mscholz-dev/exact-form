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
import UserApi from "../../../pages/api/user";
import { AxiosError } from "axios";
import UserValidatorClass from "../../../utils/validators/UserValidator";
import FormClass from "../../../utils/Form";
import BtnLoader from "../BtnLoader";
import Avatar from "../Avatar";
import FormCheckbox from "./FormCheckbox";

// types
import { TProfileForm } from "../../../utils/type";

// interfaces
import { IFormProfile } from "../../../utils/interface";

// classes
const UserValidator = new UserValidatorClass();
const Form = new FormClass();

const FormProfile: FC<IFormProfile> = ({
  username,
  email,
  role,
  locale,
  market,
  setUsername,
}) => {
  const { t } = useTranslation();

  const defaultForm = {
    username: "",
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
    market: true,
  };

  const [form, setForm] =
    useState<TProfileForm>(defaultForm);
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
      UserValidator.inspectProfileData(form, t);

    if (errors.length) {
      for (const { key, message } of errors) {
        UserValidator.errorStyle(key);
        toast.error(message);
      }

      setLoading(false);
      return;
    }

    try {
      await UserApi.update(form);

      const successMessage = t(
        "profile:form:success",
      );
      toast.success(successMessage);
      setForm({
        ...form,
        oldPassword: "",
        newPassword: "",
        newPassword2: "",
      });
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

    setLoading(false);
  };

  const handleChangeEmail = async () => {
    try {
      // call API
      await UserApi.createEmailToken({ locale });

      const successMessage = t(
        "profile:form:change:email:success",
      );
      toast.success(successMessage);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage =
          UserValidator.errorApiMessage(
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

  useEffect(() => {
    setForm({
      ...form,
      username,
      market,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, market]);

  useEffect(() => {
    setUsername(form.username);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.username]);

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
          <div className="avatar-profile-container">
            <p>
              {t("profile:form:avatar:title")}
            </p>
            <Avatar
              seed={form.username}
              className="avatar-profile"
            />
          </div>

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
              data-cy="btn-change-email-form"
            >
              <IconEdit />
            </button>
          </div>

          <FormInput
            icon={<IconRole />}
            id="role"
            handleChange={() => {}}
            value={Form.displayRole(role, t)}
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
              "form:input:password:edit:old:ariaDescribedby",
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
              "form:input:password:edit:new:ariaDescribedby",
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
              "form:input:password:edit:new2:ariaDescribedby",
            )}
            title={t(
              "form:input:password:edit:new2:title",
            )}
            mb
            maxLength={60}
            type="password"
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
            text={t("profile:form:submit")}
          />
        </form>
      </>
    </FormPage>
  );
};

export default FormProfile;
