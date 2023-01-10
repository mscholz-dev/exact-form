import React, { FC } from "react";

interface Props {
  children: JSX.Element;
  largeForm?: boolean;
  noContainer?: boolean;
}

const FormPage: FC<Props> = ({ children }) => {
  return (
    <section className="form-page">
      <article className="form-page-article">
        <div>{children}</div>
      </article>

      <aside className="form-page-aside"></aside>
    </section>
  );
};

export default FormPage;
