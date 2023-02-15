import React, { FC } from "react";
import useTranslation from "next-translate/useTranslation";

// interfaces
import { ITooltip } from "../../utils/interfaces";

const Tooltip: FC<ITooltip> = ({
  index,
  open,
  handleEditClick,
  handleDeleteClick,
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
        <button
          className="tooltip-modal-btn-edit"
          onClick={(e) =>
            handleEditClick(e, index)
          }
        >
          {t("form-page-key:tooltip:edit")}
        </button>
        <span className="tooltip-modal-hr" />
        <button
          className="tooltip-modal-btn-delete"
          onClick={(e) =>
            handleDeleteClick(e, index)
          }
        >
          {t("form-page-key:tooltip:delete")}
        </button>
      </div>
    </div>
  );
};

export default Tooltip;
