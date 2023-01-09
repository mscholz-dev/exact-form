import React, { FC } from "react";
import Page from "../templates/layouts/Page";

const Index: FC = () => {
  return (
    <Page
      title="Page d'accueil"
      description="Créer votre URL de collecte de formulaire en moins de deux minutes!"
    >
      <h1 style={{ fontSize: "32px" }}>
        Je suis une phrase
      </h1>
      <p style={{ fontSize: "24px" }}>
        Je suis une seconde phrase
      </p>
    </Page>
  );
};

export default Index;
