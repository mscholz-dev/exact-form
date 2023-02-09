import React, { FC } from "react";
import IconLoader from "../../../public/icons/loader.svg";

const CardFormSkeleton: FC = () => {
  return (
    <div className="card-form-skeleton">
      <span className="card-form-skeleton-icon">
        <IconLoader />
      </span>
    </div>
  );
};

export default CardFormSkeleton;
