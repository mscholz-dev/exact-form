import React, { FC } from "react";
import Page from "../templates/layouts/Page";
import FormContact from "../templates/components/Form/FormContact";

const Contact: FC = () => {
  return (
    <Page
      title="Contact"
      description="Créer votre URL de collecte de formulaire en moins de deux minutes!"
    >
      <FormContact />
    </Page>
  );
};

export default Contact;
