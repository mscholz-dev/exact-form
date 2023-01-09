import React, {
  useRef,
  useState,
  FC,
  SyntheticEvent,
} from "react";
// import { toast } from "react-toastify";
import IconUser from "../../../public/icons/user.svg";
import IconEmail from "../../../public/icons/email.svg";
import FormInput from "./FormInput";
import IconPassword from "../../../public/icons/password.svg";
import { useRouter } from "next/router";
import FormPage from "./FormPage";
import {
  handleChange,
  addErrorClass,
} from "../../../utils/form";

const FormSignup: FC = () => {
  const router = useRouter();

  const lastNameRef =
    useRef<HTMLInputElement>(null);
  const firstNameRef =
    useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const passwordRef =
    useRef<HTMLInputElement>(null);
  const password2Ref =
    useRef<HTMLInputElement>(null);

  const [lastName, setLastName] =
    useState<string>("");
  const [firstName, setFirstName] =
    useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [password, setPassword] =
    useState<string>("");
  const [password2, setPassword2] =
    useState<string>("");

  const handleSubmit = async (
    e: SyntheticEvent,
  ) => {
    e.preventDefault();

    // try {
    //   const res = await AuthApi.signup({
    //     lastName,
    //     firstName,
    //     email,
    //     tel,
    //     password,
    //     password2,
    //   });

    //   if (res.state) {
    //     router.push("/");
    //     return;
    //   }

    //   let error = "";

    //   switch (res.message) {
    //     case "lastName empty":
    //       error =
    //         "Veuillez renseigner le champ Nom";
    //       if (lastNameRef.current)
    //         addErrorClass(lastNameRef.current);
    //       break;

    //     case "lastName too long":
    //       error =
    //         "Le champ Nom ne doit pas excéder 60 caractères";
    //       if (lastNameRef.current)
    //         addErrorClass(lastNameRef.current);
    //       break;

    //     case "firstName empty":
    //       error =
    //         "Veuillez renseigner le champ Prénom";
    //       if (firstNameRef.current)
    //         addErrorClass(firstNameRef.current);
    //       break;

    //     case "firstName too long":
    //       error =
    //         "Le champ Prénom ne doit pas excéder 60 caractères";
    //       if (firstNameRef.current)
    //         addErrorClass(firstNameRef.current);
    //       break;

    //     case "email empty":
    //       error =
    //         "Veuillez renseigner le champ Email";
    //       if (emailRef.current)
    //         addErrorClass(emailRef.current);
    //       break;

    //     case "email too long":
    //       error =
    //         "Le champ Email ne doit pas excéder 255 caractères";
    //       if (emailRef.current)
    //         addErrorClass(emailRef.current);
    //       break;

    //     case "email not correct":
    //       error = "L'email est incorrecte";
    //       if (emailRef.current)
    //         addErrorClass(emailRef.current);
    //       break;

    //     case "tel empty":
    //       error =
    //         "Veuillez renseigner le champ Téléphone";
    //       if (telRef.current)
    //         addErrorClass(telRef.current);
    //       break;

    //     case "tel not correct":
    //       error = "Le téléphone est incorrect";
    //       if (telRef.current)
    //         addErrorClass(telRef.current);
    //       break;

    //     case "password empty":
    //       error =
    //         "Veuillez renseigner le champ Mot de passe";
    //       if (passwordRef.current)
    //         addErrorClass(passwordRef.current);
    //       break;

    //     case "password too long":
    //       error =
    //         "Le champ Mot de passe ne doit pas excéder 60 caractères";
    //       if (passwordRef.current)
    //         addErrorClass(passwordRef.current);
    //       break;

    //     case "password2 empty":
    //       error =
    //         "Veuillez renseigner le champ Confirmer le mot de passe";
    //       if (password2Ref.current)
    //         addErrorClass(password2Ref.current);
    //       break;

    //     case "password2 too long":
    //       error =
    //         "Le champ Confirmer le mot de passe ne doit pas excéder 60 caractères";
    //       if (password2Ref.current)
    //         addErrorClass(password2Ref.current);
    //       break;

    //     case "passwords didn't match":
    //       error =
    //         "Les deux mots de passe ne sont pas identique";
    //       if (passwordRef.current)
    //         addErrorClass(passwordRef.current);
    //       if (password2Ref.current)
    //         addErrorClass(password2Ref.current);
    //       break;

    //     case "user already exist":
    //       error = "L'utilisateur existe déjà";
    //       if (lastNameRef.current)
    //         addErrorClass(lastNameRef.current);
    //       if (firstNameRef.current)
    //         addErrorClass(firstNameRef.current);
    //       if (emailRef.current)
    //         addErrorClass(emailRef.current);
    //       if (telRef.current)
    //         addErrorClass(telRef.current);
    //       break;

    //     default:
    //       error = "Une erreur s'est produite";
    //   }

    //   toast.error(error);
    //   return;
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <FormPage>
      <>
        <h1>
          <span className="title-bold">
            FORMULAIRE D&apos; INSCRIPTION
          </span>
        </h1>
        <p className="form-page-form-text">
          Tous les champs sont obligatoires
        </p>

        <form
          method="POST"
          onSubmit={handleSubmit}
        >
          <FormInput
            icon={<IconUser />}
            id="firstName"
            myRef={firstNameRef}
            handleChange={handleChange}
            setState={setFirstName}
            state={firstName}
            ariaDescribedby="Veuillez renseigner votre prénom"
            title="Prénom"
            mb
            maxLength={60}
            type="text"
          />

          <FormInput
            icon={<IconEmail />}
            id="email"
            myRef={emailRef}
            handleChange={handleChange}
            setState={setEmail}
            state={email}
            ariaDescribedby="Veuillez renseigner votre email"
            title="Email"
            mb
            maxLength={255}
            type="email"
          />

          <FormInput
            icon={<IconPassword />}
            id="password"
            myRef={passwordRef}
            handleChange={handleChange}
            setState={setPassword}
            state={password}
            ariaDescribedby="Veuillez renseigner votre mot de passe"
            title="Mot de passe"
            mb
            maxLength={60}
            type="password"
          />
          <FormInput
            icon={<IconPassword />}
            id="password2"
            myRef={password2Ref}
            handleChange={handleChange}
            setState={setPassword2}
            state={password2}
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
