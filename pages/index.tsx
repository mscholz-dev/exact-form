import React, { FC } from "react";
import Page from "../templates/layouts/Page";
import useTranslation from "next-translate/useTranslation";

interface Props {
  locale: string;
}

const Index: FC<Props> = ({ locale }) => {
  const { t } = useTranslation("index");

  return (
    <Page
      title={t("index:metaTitle")}
      description="Créer votre URL de collecte de formulaire en moins de deux minutes!"
      padding
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
