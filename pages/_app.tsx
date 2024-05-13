import React, { FC, useEffect } from "react";
import { AppProps } from "next/app";
import "../styles/main.scss";
import "react-toastify/dist/ReactToastify.css";
import "regenerator-runtime/runtime";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const logoLog = async () => {
      const logoStyle = (logo: string) => `
        background-image: url(${`data:image/svg+xml;base64,${btoa(logo)}`});
        background-repeat: no-repeat;
        background-size: 32px;
        color: white;
        font-family: sans-serif;
        font-size: 32px;
        padding-left: 42px;
      `;

      const logo1 = await (await fetch(`/mscholzdev/logo-1.svg`)).text();
      console.info("%cCréé par Morgan Scholz avec ❤️", logoStyle(logo1));

      const logo2 = await (await fetch(`/mscholzdev/logo-2.svg`)).text();
      console.info("%chttps://mscholz.dev", logoStyle(logo2));

      const logo3 = await (await fetch(`/mscholzdev/logo-3.svg`)).text();
      console.info("%cmscholz.dev@gmail.com", logoStyle(logo3));
    };
    logoLog();
  }, []);

  return <Component {...pageProps} />;
};

export default App;
