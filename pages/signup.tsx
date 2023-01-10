import React, { FC } from "react";
import Page from "../templates/layouts/Page";
import FormSignup from "../templates/components/Form/FormSignup";

const Register: FC = () => {
  return (
    <Page
      title="Inscription"
      description="Créer votre URL de collecte de formulaire en moins de deux minutes!"
    >
      <FormSignup />
    </Page>
  );
};

export default Register;
