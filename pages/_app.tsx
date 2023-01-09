import React, { FC } from "react";
import { AppProps } from "next/app";
import "../styles/main.scss";
import "regenerator-runtime/runtime";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
