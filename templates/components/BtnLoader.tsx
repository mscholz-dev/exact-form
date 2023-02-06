import React, { FC } from "react";
import IconLoader from "../../public/icons/loader.svg";

// interfaces
import { IBtnLoader } from "../../utils/interface";

const BtnLoader: FC<IBtnLoader> = ({
  loading,
  text,
}) => {
  return (
    <button
      type="submit"
      className="btn-submit"
      data-cy="btn-form"
    >
      {loading ? (
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
