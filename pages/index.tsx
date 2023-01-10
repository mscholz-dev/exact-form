import React, { FC } from "react";
import Page from "../templates/layouts/Page";
import useTranslation from "next-translate/useTranslation";

const Index: FC = () => {
  const { t } = useTranslation("index");

  return (
    <Page
      title={t("index:meta:title")}
      description={t("common:meta:description")}
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
