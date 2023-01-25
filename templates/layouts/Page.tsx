import React, { FC, useRef } from "react";
import Head from "next/head";
import Header from "./Header";
import { ToastContainer } from "react-toastify";

// interfaces
import { IPage } from "../../utils/interface";

const Page: FC<IPage> = ({
  title,
  children,
  className,
  description,
  padding,
  cookie,
}) => {
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <title>{`EXACT FORM • ${title}`}</title>
        <meta
          name="description"
          content={description}
        />
        <meta
          name="robots"
          content="index, follow"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header myRef={headerRef} cookie={cookie} />
      <div
        className={`body-wrapper${
          className ? ` ${className}` : ""
        }`}
      >
        <main
          className={`${
            padding ? " main-padding" : ""
          }`}
        >
          {children}
        </main>
        <ToastContainer />
      </div>
    </>
  );
};

export default Page;
