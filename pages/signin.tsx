import React, { FC } from "react";
import Page from "../templates/layouts/Page";
import FormSignin from "../templates/components/Form/FormSignin";
import useTranslation from "next-translate/useTranslation";

const Login: FC = () => {
  const { t } = useTranslation("signin");

  return (
    <Page
      title={t("signin:meta:title")}
      description={t("common:meta:description")}
    >
      <FormSignin />
    </Page>
  );
};

export default Login;
