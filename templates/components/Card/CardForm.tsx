import React, { FC } from "react";
import Link from "next/link";
import LinkHelperClass from "../../../utils/LinkHelper";

// interfaces
import { ICardForm } from "../../../utils/interface";

// classes
const LinkHelper = new LinkHelperClass();

const CardForm: FC<ICardForm> = ({
  name,
  keyName,
  timezone,
  items,
  owner,
  locale,
}) => {
  return (
    <Link
      href={LinkHelper.translate(
        locale,
        `form/${keyName}`,
      )}
      className="card-form"
    >
      <h2>{name}</h2>
    </Link>
  );
};

export default CardForm;
