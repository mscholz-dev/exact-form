import React, {
  FC,
  useEffect,
  useState,
} from "react";
import Page from "../templates/layouts/Page";
import FormSignin from "../templates/components/Form/FormSignin";
import useTranslation from "next-translate/useTranslation";
import AuthApi from "./api/auth";

// types
import { TLocale, TCookie } from "../utils/type";

const SignIn: FC<TLocale> = ({ locale }) => {
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
      title={t("signin:meta:title")}
      description={t("common:meta:description")}
      cookie={cookie as TCookie}
      locale={locale}
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
