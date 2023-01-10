import React, {
  FC,
  ReactNode,
  useRef,
} from "react";
import Head from "next/head";
import Header from "./Header";
import { ToastContainer } from "react-toastify";

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
  description: string;
  padding?: boolean;
}

const Page: FC<Props> = ({
  title,
  children,
  className,
  description,
  padding,
}) => {
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
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
      <Header myRef={headerRef} />
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
