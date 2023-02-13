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
  const [countAll, setCountAll] = useState(null);
  const [loading, setLoading] = useState(true);

  // paging
  const [currentPage, setCurrentPage] =
    useState<number>(1);

  const isAuthAndGetSpecificForm = async () => {
    if (!router.query.key) return;

    try {
      setLoading(true);
      const res = await FormApi.getSpecificForm(
        router.query.key as string,
        currentPage,
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
      router.push(
        LinkHelper.translate(locale, ""),
      );
      return;
    }
  };

  useEffect(() => {
    isAuthAndGetSpecificForm();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, router.query.key]);

  return (
    <Page
      title={t("form-page-key:meta:title")}
      description={t("common:meta:description")}
      padding
      cookie={cookie as TCookie}
      locale={locale}
    >
      <Table
        items={items}
        title={name}
        countAll={countAll}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maxPage={(countAll || 0) / 50}
        noDataFoundTitle={t(
          "form-page-key:noDataFound:title",
        )}
        loading={loading}
        locale={locale}
        timezone={timezone}
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
