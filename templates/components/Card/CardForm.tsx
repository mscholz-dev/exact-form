import React, { FC } from "react";
import Link from "next/link";
import LinkHelperClass from "../../../utils/LinkHelper";
import Avatar from "../Avatar";
import useTranslation from "next-translate/useTranslation";

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
  const { t } = useTranslation();

  return (
    <Link
      href={LinkHelper.translate(
        locale,
        `form/${keyName}`,
      )}
      className="card-form"
    >
      <h2
        className="card-form-title"
        title={name}
      >
        {name}
      </h2>

      <span className="card-form-wrapper">
        <span className="card-form-container">
          <span className="card-form-text">
            {t("form-page:card:owner")}
          </span>
          <span
            className="card-form-value"
            title={owner}
          >
            <Avatar
              seed={owner}
              className="card-form-avatar"
            />
            {owner}
          </span>
        </span>

        <span className="card-form-container">
          <span className="card-form-text">
            {t("form-page:card:timezone")}
          </span>
          <span className="card-form-value">
            {timezone.name}
          </span>
        </span>

        <span className="card-form-container">
          <span className="card-form-text">
            {t("form-page:card:items")}
          </span>
          <span className="card-form-value">
            {items}
          </span>
        </span>
      </span>
    </Link>
  );
};

export default CardForm;
