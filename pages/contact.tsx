import React, { FC } from "react";
import Page from "../templates/layouts/Page";
import FormContact from "../templates/components/Form/FormContact";
import useTranslation from "next-translate/useTranslation";

// types
import { TLocale } from "../utils/type";

const Contact: FC<TLocale> = ({ locale }) => {
  const { t } = useTranslation("contact");

  return (
    <Page
      title={t("contact:meta:title")}
      description={t("common:meta:description")}
    >
      <FormContact locale={locale} />
    </Page>
  );
};

export default Contact;

export const getServerSideProps = async ({
  locale,
}: TLocale) => {
  return { props: { locale } };
};
