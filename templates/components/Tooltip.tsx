import React, { FC } from "react";
import useTranslation from "next-translate/useTranslation";
import IconLoader from "../../public/icons/loader.svg";

// interfaces
import { ITooltip } from "../../utils/interfaces";

const Tooltip: FC<ITooltip> = ({
  index,
  open,
  handleEditClick,
  handleDeleteClick,
  deleteLoading,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`tooltip${
        open ? " tooltip-open" : ""
      }`}
    >
      <div className="tooltip-dot">
        <span className="tooltip-dot-one" />
        <span className="tooltip-dot-two" />
        <span className="tooltip-dot-three" />
      </div>

      <div className="tooltip-modal">
        <div className="tooltip-modal-border">
          <button
            className="tooltip-modal-btn-edit"
            onClick={(e) =>
              handleEditClick(e, index)
            }
            data-cy={`tooltip-edit-${index}`}
          >
            {t("common:tooltip:edit")}
          </button>
          <span className="tooltip-modal-hr" />
          <button
            className="tooltip-modal-btn-delete"
            onClick={(e) =>
              handleDeleteClick(e, index)
            }
            data-cy={`tooltip-delete-${index}`}
          >
            {deleteLoading ? (
              <span className="tooltip-modal-btn-delete-loading">
                <IconLoader />
              </span>
            ) : (
              <>{t("common:tooltip:delete")}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
