import React, { FC } from "react";
import IconDatabase from "../../public/icons/database.svg";

// interfaces
import { INoDataFound } from "../../utils/interfaces";

const NoDataFound: FC<INoDataFound> = ({
  title,
  largeTXS,
}) => {
  return (
    <div
      className={`no-data-found${
        largeTXS
          ? " no-data-found-large-t-xs"
          : ""
      }`}
    >
      <span className="no-data-found-icon">
        <IconDatabase />
      </span>
      <h2 className="no-data-found-title">
        {title}
      </h2>
    </div>
  );
};

export default NoDataFound;
