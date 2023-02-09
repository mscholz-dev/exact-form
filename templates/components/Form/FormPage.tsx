import React, { FC } from "react";

// interfaces
import { IFormPage } from "../../../utils/interfaces";

const FormPage: FC<IFormPage> = ({
  children,
}) => {
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
