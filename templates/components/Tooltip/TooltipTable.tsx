import React, { FC } from "react";
import useTranslation from "next-translate/useTranslation";
import IconLoader from "../../../public/icons/loader.svg";

// interfaces
import { ITooltipTable } from "../../../utils/interfaces";

const TooltipTable: FC<ITooltipTable> = ({
  index,
  open,
  handleEditClick,
  handleDeleteClick,
  deleteLoading,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`tooltip-table${
        open ? " tooltip-table-open" : ""
      }`}
    >
      <div className="tooltip-table-dot">
        <span className="tooltip-table-dot-one" />
        <span className="tooltip-table-dot-two" />
        <span className="tooltip-table-dot-three" />
      </div>

      <div className="tooltip-table-modal">
        <div className="tooltip-table-modal-border">
          <button
            className="tooltip-table-modal-btn-edit"
            onClick={(e) =>
              handleEditClick(e, index)
            }
            data-cy={`tooltip-table-edit-${index}`}
          >
            {t("common:tooltip:edit")}
          </button>
          <span className="tooltip-table-modal-hr" />
          <button
            className="tooltip-table-modal-btn-delete"
            onClick={(e) =>
              handleDeleteClick(e, index)
            }
            data-cy={`tooltip-delete-${index}`}
          >
            {deleteLoading ? (
              <span className="tooltip-table-modal-btn-delete-loading">
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

export default TooltipTable;
