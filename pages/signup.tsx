import React, { FC } from "react";
import Page from "../templates/layouts/Page";
import FormSignup from "../templates/components/Form/FormSignup";
import useTranslation from "next-translate/useTranslation";

const SignUp: FC = () => {
  const { t } = useTranslation("signup");

  return (
    <Page
      title={t("signup:meta:title")}
      description={t("common:meta:description")}
    >
      <FormSignup />
    </Page>
  );
};

export default SignUp;
