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

type Form = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

const FormSignup: FC = () => {
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
          FORMULAIRE D&apos; INSCRIPTION
        </h1>
        <p className="form-page-subtitle">
          Tous les champs sont obligatoires
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
            ariaDescribedby="Veuillez renseigner votre pseudo"
            title="Pseudo"
            mb
            maxLength={60}
            type="text"
          />

          <FormInput
            icon={<IconEmail />}
            id="email"
            handleChange={handleChange}
            value={form.email}
            ariaDescribedby="Veuillez renseigner votre email"
            title="Email"
            mb
            maxLength={255}
            type="email"
          />

          <FormInput
            icon={<IconPassword />}
            id="password"
            handleChange={handleChange}
            value={form.password}
            ariaDescribedby="Veuillez renseigner votre mot de passe"
            title="Mot de passe"
            mb
            maxLength={60}
            type="password"
          />
          <FormInput
            icon={<IconPassword />}
            id="password2"
            handleChange={handleChange}
            value={form.password2}
            ariaDescribedby="Veuillez renseigner votre confirmation de mot de passe"
            title="Confirmer le mot de passe"
            maxLength={60}
            type="password"
          />

          <button
            type="submit"
            className="btn-submit"
          >
            S&apos;inscrire
          </button>
        </form>
      </>
    </FormPage>
  );
};

export default FormSignup;
