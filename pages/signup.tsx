import React, {
  FC,
  useEffect,
  useState,
} from "react";
import Page from "../templates/layouts/Page";
import FormSignup from "../templates/components/Form/FormSignup";
import useTranslation from "next-translate/useTranslation";
import AuthApi from "./api/auth";

// types
import { TLocale, TCookie } from "../utils/type";

const SignUp: FC<TLocale> = ({ locale }) => {
  const { t } = useTranslation("signup");

  const [cookie, setCookie] = useState({
    email: "",
    username: "",
    role: "",
  });

  const isAuth = async () => {
    try {
      const res = await AuthApi.index(undefined);
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
      title={t("signup:meta:title")}
      description={t("common:meta:description")}
      cookie={cookie as TCookie}
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
