import React, { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const Wrapper: FC<Props> = ({
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
