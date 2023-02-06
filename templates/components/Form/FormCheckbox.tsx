import React, { FC, useState } from "react";
import IconCheck from "../../../public/icons/check.svg";

// interfaces
import { IFormCheckbox } from "../../../utils/interface";

const FormCheckbox: FC<IFormCheckbox> = ({
  id,
  handleChange,
  value,
  title,
  ariaDescribedby,
}) => {
  const [focus, setFocus] =
    useState<boolean>(false);

  const handleFocus = (): void => setFocus(true);
  const handleBlur = (): void => setFocus(false);

  return (
    <label
      className={`form-checkbox${
        focus ? " form-checkbox-focus" : ""
      }${value ? " form-checkbox-checked" : ""}`}
    >
      <span className="form-checkbox-icon">
        <IconCheck />
      </span>

      <span className="form-checkbox-text">
        {title}
      </span>

      <input
        id={id}
        type="checkbox"
        className="form-checkbox-control"
        checked={value}
        value={id}
        onChange={(e) => handleChange(e, id)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-describedby={ariaDescribedby}
        data-cy={id}
      />
    </label>
  );
};

export default FormCheckbox;
