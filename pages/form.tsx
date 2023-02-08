import React, {
  FC,
  useEffect,
  useState,
} from "react";
import Page from "../templates/layouts/Page";
import useTranslation from "next-translate/useTranslation";
import AuthApi from "./api/auth";
import { useRouter } from "next/router";
import LinkHelperClass from "../utils/LinkHelper";
import CardPage from "../templates/components/Card/CardPage";

// types
import { TCookie, TLocale } from "../utils/type";

// interfaces
import { IForm } from "../utils/interface";

// classes
const LinkHelper = new LinkHelperClass();

const Form: FC<IForm> = ({ locale }) => {
  const { t } = useTranslation();

  const router = useRouter();

  const [cookie, setCookie] = useState({
    email: "",
    username: "",
    role: "",
  });

  // paging
  const [currentPage, setCurrentPage] =
    useState<number>(1);
  const [maxPage, setMaxPage] =
    useState<number>(10);

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

  const formItems = [
    {
      name: "Contddddddddddddddddddddddddddddact Form",
      key: "0001",
      timezone: {
        name: "Europe",
        offset: 2,
      },
      items: 12,
      owner:
        "mschodddddddddddddddddddddddddlz.dev",
    },
    {
      name: "Contact Form",
      key: "0001",
      timezone: {
        name: "Europe",
        offset: 2,
      },
      items: 12,
      owner: "mscholz.dev",
    },
    {
      name: "Contact Form",
      key: "0001",
      timezone: {
        name: "Europe",
        offset: 2,
      },
      items: 12,
      owner: "mscholz.dev",
    },
    {
      name: "Contact Form",
      key: "0001",
      timezone: {
        name: "Europe",
        offset: 2,
      },
      items: 12,
      owner: "mscholz.dev",
    },
  ];

  return (
    <Page
      title={t("form-page:meta:title")}
      description={t("common:meta:description")}
      padding
      cookie={cookie as TCookie}
      locale={locale}
    >
      <CardPage
        locale={locale}
        items={formItems}
        title={t("form-page:title")}
        createTitle={t("form-page:createTitle")}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maxPage={maxPage}
        creationPathname="form/creation"
      />
    </Page>
  );
};

export default Form;

export const getServerSideProps = async ({
  locale,
}: TLocale) => {
  return { props: { locale } };
};
