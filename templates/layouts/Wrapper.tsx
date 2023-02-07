import React, { FC } from "react";

// interfaces
import { IWrapper } from "../../utils/interface";

const Wrapper: FC<IWrapper> = ({
  children,
  className,
}) => {
  return (
    <section
      className={`${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </section>
  );
};

export default Wrapper;
