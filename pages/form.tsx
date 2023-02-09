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
import { TCookie, TLocale } from "../utils/types";

// interfaces
import { IForm } from "../utils/interfaces";
import FormApi from "./api/form";

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

  const [forms, setForms] = useState([]);

  // paging
  const [currentPage, setCurrentPage] =
    useState<number>(1);
  const [maxPage, setMaxPage] =
    useState<number>(10);

  const isAuthAndGetAll = async () => {
    try {
      const res = await FormApi.getAll();

      setCookie({
        username: res.data.username,
        email: res.data.email,
        role: res.data.role,
      });
      setForms(res.data.forms);
    } catch (err) {
      router.push(
        LinkHelper.translate(locale, ""),
      );
      return;
    }
  };

  useEffect(() => {
    isAuthAndGetAll();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: add paging, loader/skeleton too, sorting??
  // add count all in result
  // component nothing created

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
        items={forms}
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
