import React, { FC } from "react";

// interfaces
import { IWrapper } from "../../utils/interface";

const Wrapper: FC<IWrapper> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
