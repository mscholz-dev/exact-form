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
  tooltipBtnCurrentId,
  recoverLoading,
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
            className={`${
              tooltipBtnCurrentId === 0
                ? "tooltip-table-modal-btn-edit"
                : "tooltip-table-modal-btn-recover"
            }`}
            onClick={(e) =>
              handleEditClick(e, index)
            }
            data-cy={`tooltip-table-${
              tooltipBtnCurrentId === 0
                ? "edit"
                : "recover"
            }-${index}`}
          >
            {tooltipBtnCurrentId === 0 ? (
              <>{t("common:tooltip:edit")}</>
            ) : (
              <>
                {recoverLoading ? (
                  <span className="tooltip-table-modal-btn-recover-loading">
                    <IconLoader />
                  </span>
                ) : (
                  <>
                    {t("common:tooltip:recover")}
                  </>
                )}
              </>
            )}
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
