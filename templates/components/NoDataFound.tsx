import React, { FC } from "react";
import IconDatabase from "../../public/icons/database.svg";

// interfaces
import { INoDataFound } from "../../utils/interfaces";

const NoDataFound: FC<INoDataFound> = ({
  title,
}) => {
  return (
    <div className="no-data-found">
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
