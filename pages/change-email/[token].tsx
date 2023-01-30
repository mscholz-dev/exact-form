import React, {
  FC,
  useState,
  useEffect,
} from "react";
import Page from "../../templates/layouts/Page";
import useTranslation from "next-translate/useTranslation";
import AuthApi from "../api/auth";
import { useRouter } from "next/router";
import FormChangeEmail from "../../templates/components/Form/FormChangeEmail";

// types
import {
  TCookie,
  TLocale,
} from "../../utils/type";

const ChangeEmail: FC<TLocale> = ({ locale }) => {
  const { t } = useTranslation();

  const router = useRouter();

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
      router.push("/");
      return;
    }
  };

  useEffect(() => {
    isAuth();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page
      title={t("change-email:meta:title")}
      description={t("common:meta:description")}
      cookie={cookie as TCookie}
    >
      <FormChangeEmail
        email={cookie.email}
        locale={locale}
      />
    </Page>
  );
};

export default ChangeEmail;

export const getServerSideProps = async ({
  locale,
}: TLocale) => {
  return { props: { locale } };
};
