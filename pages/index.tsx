import React, {
  FC,
  useEffect,
  useState,
} from "react";
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
          color: "red",
          marginBottom: "24px",
        }}
      >
        A L&apos;INTENTION DES UTILISATEURS
      </h1>
      <p style={{ fontSize: "24px" }}>
        Ce site est actuellement en cours de
        développement, cela signifie que chaque
        compte, chaque donnée stockée est
        suceptible de se faire supprimer.
        <br />
        <br />
        Considérez ce site comme une préprod , ce
        qui n&apos;est pas le cas par faute de
        moyen.
        <br />
        <br />
        <span
          style={{
            color: "blue",
            fontWeight: "bold",
          }}
        >
          La fin de la V1 du site est prévu pour
          début mai.
        </span>
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
