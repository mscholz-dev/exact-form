import React, { FC } from "react";
import Link from "next/link";
import LinkHelperClass from "../../../utils/LinkHelper";
import Avatar from "../Avatar";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import Tooltip from "../Tooltip/TooltipTable";

// interfaces
import { ICardForm } from "../../../utils/interfaces";

// classes
const LinkHelper = new LinkHelperClass();

const CardForm: FC<ICardForm> = ({
  name,
  keyName,
  timezone,
  items,
  owner,
  locale,
  handleTooltipClick,
  handleTooltipEditClick,
  handleTooltipDeleteClick,
  tooltips,
  index,
  tooltipDeleteLoading,
  tooltipBtnCurrentId,
  handleTooltipRecoverClick,
  recoverLoading,
}) => {
  const { t } = useTranslation();

  const router = useRouter();

  return (
    <Link
      href={{
        pathname: LinkHelper.translate(
          locale,
          "form/[key]",
        ),
        query: { key: keyName },
      }}
      className={`card-form${
        tooltipBtnCurrentId === 1
          ? " card-form-no-hover"
          : ""
      }`}
      data-cy={name.replaceAll(" ", "-")}
      onClick={
        tooltipBtnCurrentId === 0
          ? (e) =>
              LinkHelper.redirect(
                e,
                router,
                locale,
                "form/[key]",
                { name: "key", value: keyName },
              )
          : (e) => LinkHelper.preventDefault(e)
      }
    >
      <span className="card-form-header">
        <h2
          className="card-form-title"
          title={name}
        >
          {name}
        </h2>

        <span
          className="card-form-tooltip"
          onClick={(e) =>
            handleTooltipClick(e, index)
          }
          tabIndex={0}
          data-cy={`tooltip-${index}`}
        >
          <Tooltip
            index={index}
            open={tooltips[index]}
            handleEditClick={
              tooltipBtnCurrentId === 0
                ? (e) =>
                    handleTooltipEditClick(
                      e,
                      index,
                    )
                : (e) =>
                    handleTooltipRecoverClick(
                      e,
                      index,
                    )
            }
            handleDeleteClick={(e) =>
              handleTooltipDeleteClick(e, index)
            }
            deleteLoading={tooltipDeleteLoading}
            tooltipBtnCurrentId={
              tooltipBtnCurrentId
            }
            recoverLoading={recoverLoading}
          />
        </span>
      </span>

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
            <span className="card-form-owner">
              {owner}
            </span>
          </span>
        </span>

        <span className="card-form-container">
          <span className="card-form-text">
            {t("form-page:card:timezone")}
          </span>
          <span className="card-form-value">
            {timezone}
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
