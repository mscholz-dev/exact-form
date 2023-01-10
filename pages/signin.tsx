import React, { FC } from "react";
import Page from "../templates/layouts/Page";
import FormSignin from "../templates/components/Form/FormSignin";

const Login: FC = () => {
  return (
    <Page
      title="Connexion"
      description="Créer votre URL de collecte de formulaire en moins de deux minutes!"
    >
      <FormSignin />
    </Page>
  );
};

export default Login;
