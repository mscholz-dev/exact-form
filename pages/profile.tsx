import React, {
  FC,
  useState,
  useEffect,
} from "react";
import Page from "../templates/layouts/Page";
import useTranslation from "next-translate/useTranslation";
import AuthApi from "./api/auth";
import { useRouter } from "next/router";
import FormProfile from "../templates/components/Form/FormProfile";

// types
import { TCookie, TLocale } from "../utils/type";

const Profile: FC<TLocale> = ({ locale }) => {
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
      title={t("profile:meta:title")}
      description={t("common:meta:description")}
      cookie={cookie as TCookie}
    >
      <FormProfile
        {...(cookie as TCookie)}
        locale={locale}
      />
    </Page>
  );
};

export default Profile;

export const getServerSideProps = async ({
  locale,
}: TLocale) => {
  return { props: { locale } };
};
