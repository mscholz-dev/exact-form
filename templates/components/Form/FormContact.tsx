import React, {
  useState,
  FC,
  SyntheticEvent,
  ChangeEvent,
} from "react";
// import { toast } from "react-toastify";
import IconUser from "../../../public/icons/user.svg";
import IconPhone from "../../../public/icons/phone.svg";
import IconEmail from "../../../public/icons/email.svg";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
// import { useRouter } from "next/router";
import FormPage from "./FormPage";

type Form = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

const FormContact: FC = () => {
  // const router = useRouter();

  const [form, setForm] = useState<Form>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
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
          FORMULAIRE DE CONTACT
        </h1>
        <p className="form-page-subtitle">
          Tous les champs avec un astérisque sont
          obligatoires
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
              ariaDescribedby="Veuillez renseigner votre nom"
              title="Nom*"
              mb
              maxLength={60}
              type="text"
            />

            <FormInput
              icon={<IconUser />}
              id="firstName"
              handleChange={handleChange}
              value={form.firstName}
              ariaDescribedby="Veuillez renseigner votre prénom"
              title="Prénom*"
              mb
              maxLength={60}
              type="text"
            />
          </div>

          <FormInput
            icon={<IconEmail />}
            id="email"
            handleChange={handleChange}
            value={form.email}
            ariaDescribedby="Veuillez renseigner votre email"
            title="Email*"
            mb
            maxLength={255}
            type="email"
          />

          <FormInput
            icon={<IconPhone />}
            id="phone"
            handleChange={handleChange}
            value={form.phone}
            ariaDescribedby="Veuillez renseigner votre numéro de téléphone"
            title="Téléphone"
            mb
            maxLength={60}
            type="text"
          />

          <FormTextarea
            id="message"
            handleChange={handleChange}
            value={form.message}
            ariaDescribedby="Veuillez renseigner votre email"
            title="Message*"
            maxLength={10000}
          />

          <button
            type="submit"
            className="btn-submit"
          >
            Envoyer
          </button>
        </form>
      </>
    </FormPage>
  );
};

export default FormContact;
