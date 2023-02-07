import React, { FC } from "react";
import Link from "next/link";
import LinkHelperClass from "../../../utils/LinkHelper";
import IconPlus from "../../../public/icons/plus.svg";

// interfaces
import { ICardFormPreset } from "../../../utils/interface";

// classes
const LinkHelper = new LinkHelperClass();

const CardFormPreset: FC<ICardFormPreset> = ({
  pathname,
  locale,
  title,
}) => {
  return (
    <Link
      href={LinkHelper.translate(
        locale,
        pathname,
      )}
      className="card-form-preset"
    >
      <span className="card-form-preset-icon">
        <IconPlus />
      </span>
      <span className="card-form-preset-title">
        {title}
      </span>
    </Link>
  );
};

export default CardFormPreset;
