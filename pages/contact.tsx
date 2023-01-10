import React, { FC } from "react";
import Page from "../templates/layouts/Page";
import FormContact from "../templates/components/Form/FormContact";
import useTranslation from "next-translate/useTranslation";

const Contact: FC = () => {
  const { t } = useTranslation("contact");

  return (
    <Page
      title={t("contact:meta:title")}
      description={t("common:meta:description")}
    >
      <FormContact />
    </Page>
  );
};

export default Contact;
