import React, { useState, FC } from "react";

// interfaces
import { IFormTextarea } from "../../../utils/interfaces";

const FormTextarea: FC<IFormTextarea> = ({
  id,
  handleChange,
  value,
  ariaDescribedby,
  title,
  maxLength,
  asterix,
}) => {
  const [focus, setFocus] =
    useState<boolean>(false);

  const handleFocus = (): void => setFocus(true);
  const handleBlur = (): void => setFocus(false);

  return (
    <label
      className={`form-input-container form-input-textarea${
        focus ? " form-input-focus" : ""
      }${
        value.length ? " form-input-filled" : ""
      }`}
    >
      <textarea
        id={id}
        onChange={(e) => handleChange(e, id)}
        value={value}
        className="form-input-control"
        aria-describedby={ariaDescribedby}
        placeholder=""
        onFocus={handleFocus}
        onBlur={handleBlur}
        rows={4}
        maxLength={maxLength}
        data-cy={id}
      />
      <span className="form-input-title">
        {title}
        {asterix ? "*" : ""}
      </span>
    </label>
  );
};

export default FormTextarea;
