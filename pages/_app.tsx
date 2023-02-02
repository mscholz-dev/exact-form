import React, { FC } from "react";
import { AppProps } from "next/app";
import "../styles/main.scss";
import "react-toastify/dist/ReactToastify.css";
import "regenerator-runtime/runtime";

const App: FC<AppProps> = ({
  Component,
  pageProps,
}) => {
  return <Component {...pageProps} />;
};

export default App;
