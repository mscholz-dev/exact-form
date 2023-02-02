import React, {
  FC,
  useEffect,
  useState,
} from "react";
import Page from "../templates/layouts/Page";
import useTranslation from "next-translate/useTranslation";
import AuthApi from "./api/auth";

// types
import { TCookie, TLocale } from "../utils/type";

// interfaces
import { IIndex } from "../utils/interface";

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

export const getServerSideProps = async ({
  locale,
}: TLocale) => {
  return { props: { locale } };
};
