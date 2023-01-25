import React, {
  FC,
  useEffect,
  useState,
} from "react";
import Page from "../templates/layouts/Page";
import useTranslation from "next-translate/useTranslation";
import AuthApi from "./api/auth";
import { GetServerSidePropsContext } from "next";

// types
import { TCookie } from "../utils/type";

// interfaces
import { IIndex } from "../utils/interface";

const Index: FC<IIndex> = ({ cookieProps }) => {
  const { t } = useTranslation("index");

  const [cookie, setCookie] = useState({
    email: "",
    username: "",
    role: "",
  });

  useEffect(() => {
    if (!cookieProps.role) return;

    setCookie(cookieProps);
  }, [cookieProps]);

  return (
    <Page
      title={t("index:meta:title")}
      description={t("common:meta:description")}
      padding
      cookie={cookie as TCookie}
    >
      <h1 style={{ fontSize: "32px" }}>
        Je suis une phrase
      </h1>
      <p style={{ fontSize: "24px" }}>
        Je suis une seconde phrase
      </p>
    </Page>
  );
};

export default Index;

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  try {
    console.log(ctx.req.headers.cookie);

    const res = await AuthApi.index(
      ctx.req.headers.cookie,
    );
    return {
      props: {
        cookieProps: res.data,
      },
    };
  } catch (err) {
    return {
      props: {
        cookieProps: {
          email: "",
          username: "",
          role: "",
        },
      },
    };
  }
};
