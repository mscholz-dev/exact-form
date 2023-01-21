import React, { FC } from "react";
import Page from "../templates/layouts/Page";
import FormSignup from "../templates/components/Form/FormSignup";
import useTranslation from "next-translate/useTranslation";

// types
import { TLocale } from "../utils/type";

const SignUp: FC<TLocale> = ({ locale }) => {
  const { t } = useTranslation("signup");

  return (
    <Page
      title={t("signup:meta:title")}
      description={t("common:meta:description")}
    >
      <FormSignup locale={locale} />
    </Page>
  );
};

export default SignUp;

export const getServerSideProps = async ({
  locale,
}: TLocale) => {
  return { props: { locale } };
};
