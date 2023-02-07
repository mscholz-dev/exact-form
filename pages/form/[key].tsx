import React, {
  FC,
  useEffect,
  useState,
} from "react";
import Page from "../../templates/layouts/Page";
import useTranslation from "next-translate/useTranslation";
import AuthApi from "../api/auth";
import { useRouter } from "next/router";
import LinkHelperClass from "../../utils/LinkHelper";

// types
import {
  TCookie,
  TLocale,
} from "../../utils/type";

// interfaces
import { IFormKey } from "../../utils/interface";
import Table from "../../templates/components/Table/Table";

// classes
const LinkHelper = new LinkHelperClass();

const FormKey: FC<IFormKey> = ({ locale }) => {
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

  const data = [
    {
      firstName: "Morgan",
      lastName: "Scholz",
    },
    {
      company: "Wobinit",
      firstName: "Wob",
    },
    {
      test: "test",
      uppercase: "TEST",
      lastName: "tesT",
    },
    {
      projectNumber: "12",
    },
  ];

  return (
    <Page
      title={t("form-page-key:meta:title")}
      description={t("common:meta:description")}
      padding
      cookie={cookie as TCookie}
      locale={locale}
    >
      <Table data={data} />
    </Page>
  );
};

export default FormKey;

export const getServerSideProps = async ({
  locale,
}: TLocale) => {
  return { props: { locale } };
};
