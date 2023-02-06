import React, {
  FC,
  useState,
  useEffect,
} from "react";
import Page from "../templates/layouts/Page";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import FormProfile from "../templates/components/Form/FormProfile";
import LinkHelperClass from "../utils/LinkHelper";

// types
import { TCookie, TLocale } from "../utils/type";
import UserApi from "./api/user";

// classes
const LinkHelper = new LinkHelperClass();

const Profile: FC<TLocale> = ({ locale }) => {
  const { t } = useTranslation();

  const router = useRouter();

  const [cookie, setCookie] = useState({
    email: "",
    username: "",
    role: "",
  });
  const [username, setUsername] =
    useState<string>("");
  const [market, setMarket] =
    useState<boolean>(true);

  const isAuth = async () => {
    try {
      const res = await UserApi.profile();
      setCookie(res.data as TCookie);
      setUsername(res.data.username as string);
      setMarket(res.data.market as boolean);
    } catch (err) {
      router.push(
        LinkHelper.translate(locale, ""),
      );
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
      cookie={
        {
          ...cookie,
          username,
        } as TCookie
      }
      locale={locale}
    >
      <FormProfile
        {...(cookie as TCookie)}
        locale={locale}
        market={market}
        setUsername={setUsername}
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
