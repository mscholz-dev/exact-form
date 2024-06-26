import React, {
  FC,
  useEffect,
  useState,
} from "react";
import Page from "../templates/layouts/Page";
import useTranslation from "next-translate/useTranslation";
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
  const [countAll, setCountAll] = useState<
    null | number
  >(null);
  const [loading, setLoading] = useState(true);

  // paging
  const [currentPage, setCurrentPage] =
    useState<number>(1);

  // form view
  const [
    tooltipBtnCurrentId,
    setTooltipBtnCurrentId,
  ] = useState<number>(0);

  const isAuthAndGetAll = async (
    startLoading: boolean,
    trash: boolean,
  ) => {
    try {
      setLoading(startLoading);
      const res = await FormApi.getAll(
        currentPage,
        trash,
      );

      // add data
      setCookie({
        username: res.data.username,
        email: res.data.email,
        role: res.data.role,
      });
      setForms(res.data.forms);
      setCountAll(res.data.countAll);
      setLoading(false);
    } catch (err) {
      // no page transition
      router.push(
        LinkHelper.translate(locale, ""),
      );
      return;
    }
  };

  useEffect(() => {
    isAuthAndGetAll(
      true,
      // trash boolean
      tooltipBtnCurrentId === 1,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage, // trash boolean
    tooltipBtnCurrentId,
  ]);

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
        maxPage={(countAll || 0) / 8}
        creationPathname="form/creation"
        countAll={countAll}
        setCountAll={setCountAll}
        noDataFoundTitle={t(
          "form-page:noDataFound:title",
        )}
        loading={loading}
        isAuthAndGetAll={isAuthAndGetAll}
        tooltipBtnCurrentId={tooltipBtnCurrentId}
        setTooltipBtnCurrentId={
          setTooltipBtnCurrentId
        }
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
