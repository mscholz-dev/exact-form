import React, {
  useState,
  FC,
  SyntheticEvent,
  ChangeEvent,
} from "react";
// import { toast } from "react-toastify";
import IconEmail from "../../../public/icons/email.svg";
import FormInput from "./FormInput";
import IconPassword from "../../../public/icons/password.svg";
// import { useRouter } from "next/router";
import FormPage from "./FormPage";

type Form = {
  email: string;
  password: string;
};

const FormSignin: FC = () => {
  // const router = useRouter();

  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
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
          FORMULAIRE DE CONNEXION
        </h1>
        <p className="form-page-subtitle">
          Tous les champs sont obligatoires
        </p>

        <form
          method="POST"
          onSubmit={handleSubmit}
        >
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

          <button
            type="submit"
            className="btn-submit"
          >
            Se connecter
          </button>
        </form>
      </>
    </FormPage>
  );
};

export default FormSignin;
