import React, { FC } from "react";
import IconCross from "../../public/icons/cross.svg";

// interfaces
import { IModal } from "../../utils/interfaces";

const Modal: FC<IModal> = ({
  active,
  setActive,
  content,
}) => {
  const handleCloseClick = (): void =>
    setActive(false);

  return (
    <>
      <span
        className={`modal-filter${
          active ? " modal-filter-active" : ""
        }`}
      />

      <div
        className={`modal${
          active ? " modal-active" : ""
        }`}
      >
        <button
          className="btn-modal-close"
          onClick={handleCloseClick}
        >
          <IconCross />
        </button>

        <div className="modal-content">
          {content}
        </div>
      </div>
    </>
  );
};

export default Modal;
