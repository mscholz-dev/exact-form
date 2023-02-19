import React, {
  FC,
  SyntheticEvent,
  useRef,
  useEffect,
} from "react";
import IconLoader from "../../../public/icons/loader.svg";

// interfaces
import { ITooltipBtn } from "../../../utils/interfaces";

const TooltipBtn: FC<ITooltipBtn> = ({
  open,
  setOpen,
  items,
  currentId,
  loading,
}) => {
  const wrapperRef =
    useRef<null | HTMLSpanElement>(null);
  const containerRef =
    useRef<null | HTMLSpanElement>(null);

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // is loading
    if (loading) return;

    setOpen(!open);
  };

  useEffect(() => {
    if (
      !wrapperRef.current ||
      !containerRef.current
    )
      return;

    if (open) {
      // adding btn height + hr height + border height
      wrapperRef.current.style.height = `${
        items.length * 40 + items.length - 1 + 2
      }px`;

      // adding btn height + hr height
      containerRef.current.style.height = `${
        items.length * 40 + items.length - 1
      }px`;

      return;
    }

    // reset height
    wrapperRef.current.style.height = "0px";
    return;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <a
      className={`tooltip-btn${
        open ? " tooltip-btn-open" : ""
      }`}
      onClick={handleClick}
    >
      {loading ? (
        <span className="tooltip-btn-loading">
          <IconLoader />
        </span>
      ) : (
        <>
          <span className="tooltip-btn-icon">
            {items[currentId].icon}
          </span>

          <span className="tooltip-btn-title">
            {items[currentId].title}
          </span>
        </>
      )}

      <span
        ref={wrapperRef}
        className="tooltip-btn-modal"
      >
        <span
          ref={containerRef}
          className="tooltip-btn-modal-border"
        >
          {items.map(
            ({
              id,
              icon,
              title,
              handleClick,
              trash,
            }) => (
              <span
                key={id}
                className="tooltip-btn-modal-btn-container"
              >
                <button
                  className="tooltip-btn-modal-btn"
                  onClick={(e) =>
                    handleClick(e, id, trash)
                  }
                >
                  <span className="tooltip-btn-modal-btn-icon">
                    {icon}
                  </span>

                  <span className="tooltip-btn-modal-btn-title">
                    {title}
                  </span>
                </button>
                {items.length - 1 !== id && (
                  <span className="tooltip-btn-modal-hr" />
                )}
              </span>
            ),
          )}
        </span>
      </span>
    </a>
  );
};

export default TooltipBtn;
