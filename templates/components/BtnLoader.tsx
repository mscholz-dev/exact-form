import React, { FC } from "react";
import IconLoader from "../../public/icons/loader.svg";

// interfaces
import { IBtnLoader } from "../../utils/interfaces";

const BtnLoader: FC<IBtnLoader> = ({
  loading,
  text,
  disabled,
}) => {
  return (
    <button
      type="submit"
      className={`btn-submit${
        disabled ? " btn-submit-disabled" : ""
      }`}
      data-cy="btn-form"
    >
      {loading && !disabled ? (
        <span className="btn-submit-loading">
          <IconLoader />
        </span>
      ) : (
        text
      )}
    </button>
  );
};

export default BtnLoader;
