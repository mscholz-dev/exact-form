import React, { FC } from "react";
import Page from "../templates/layouts/Page";
import FormSignin from "../templates/components/Form/FormSignin";
import useTranslation from "next-translate/useTranslation";

// types
import { TLocale } from "../utils/type";

const SignIn: FC<TLocale> = ({ locale }) => {
  const { t } = useTranslation("signin");

  return (
    <Page
      title={t("signin:meta:title")}
      description={t("common:meta:description")}
    >
      <FormSignin locale={locale} />
    </Page>
  );
};

export default SignIn;

export const getServerSideProps = async ({
  locale,
}: TLocale) => {
  return { props: { locale } };
};
