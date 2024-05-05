import React, { FC, useEffect, useState } from "react";
import Page from "../templates/layouts/Page";
import useTranslation from "next-translate/useTranslation";
import AuthApi from "./api/auth";

// types
import { TCookie, TLocale } from "../utils/types";

// interfaces
import { IIndex } from "../utils/interfaces";

const Index: FC<IIndex> = ({ locale }) => {
  const { t } = useTranslation();

  const [cookie, setCookie] = useState({
    email: "",
    username: "",
    role: "",
  });

  const isAuth = async () => {
    try {
      const res = await AuthApi.index();
      setCookie(res.data as TCookie);
    } catch (err) {
      return;
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Page
      title={t("index:meta:title")}
      description={t("common:meta:description")}
      padding
      cookie={cookie as TCookie}
      locale={locale}
    >
      <h1
        style={{
          fontSize: "32px",
          margin: "24px",
          lineHeight: "normal",
        }}
      >
        La page d&apos;accueil n'est pas stylisé, le reste des pages et
        fonctionnalités sont disponibles,{" "}
        <u>tester de vous créer un compte !</u>
      </h1>
    </Page>
  );
};

export default Index;

export const getServerSideProps = async ({ locale }: TLocale) => {
  return { props: { locale } };
};
