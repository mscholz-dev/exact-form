import React, {
  FC,
  useEffect,
  useState,
} from "react";
import Page from "../../templates/layouts/Page";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import LinkHelperClass from "../../utils/LinkHelper";

// types
import {
  TCookie,
  TLocale,
} from "../../utils/types";

// interfaces
import { IFormKey } from "../../utils/interfaces";
import Table from "../../templates/components/Table/Table";
import FormApi from "../api/form";

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

  const [name, setName] = useState("");
  const [timezone, setTimezone] = useState("");
  const [items, setItems] = useState([]);
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

  const isAuthAndGetSpecificForm = async (
    startLoading: boolean,
    trash: boolean,
  ) => {
    try {
      setLoading(startLoading);
      const res = await FormApi.getSpecificForm(
        router.query.key as string,
        currentPage,
        trash,
      );

      // add data
      setCookie({
        username: res.data.username,
        email: res.data.email,
        role: res.data.role,
      });
      setName(res.data.name);
      setTimezone(res.data.timezone);
      setItems(res.data.items);
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
    isAuthAndGetSpecificForm(
      true,
      // trash boolean
      tooltipBtnCurrentId === 1,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, tooltipBtnCurrentId]);

  return (
    <Page
      title={t("form-page-key:meta:title")}
      description={t("common:meta:description")}
      padding
      cookie={cookie as TCookie}
      locale={locale}
    >
      <Table
        keyName={router.query.key as string}
        items={items}
        title={name}
        countAll={countAll}
        setCountAll={setCountAll}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maxPage={(countAll || 0) / 50}
        noDataFoundTitle={t(
          "form-page-key:noDataFound:title",
        )}
        loading={loading}
        locale={locale}
        timezone={timezone}
        isAuthAndGetSpecificForm={
          isAuthAndGetSpecificForm
        }
        tooltipBtnCurrentId={tooltipBtnCurrentId}
        setTooltipBtnCurrentId={
          setTooltipBtnCurrentId
        }
      />
    </Page>
  );
};

export default FormKey;

export const getServerSideProps = async ({
  locale,
}: TLocale) => {
  return { props: { locale } };
};
