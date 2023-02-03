import React, { FC, useState } from "react";
import IconCheck from "../../../public/icons/check.svg";

const FormCheckbox: FC = ({
  id,
  handleChange,
  value,
  ariaDescribedby,
}) => {
  const [focus, setFocus] =
    useState<boolean>(false);
  const [checked, setChecked] =
    useState<boolean>(true);

  const handleFocus = (): void => setFocus(true);
  const handleBlur = (): void => setFocus(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <label
      className={`form-checkbox${
        focus ? " form-checkbox-focus" : ""
      }${
        checked ? " form-checkbox-checked" : ""
      }`}
    >
      <span className="form-checkbox-icon">
        <IconCheck />
      </span>

      <span className="form-checkbox-text">
        En cochant cette case, vous accepter de
        recevoir une newsletter
      </span>

      <input
        id={id}
        type="checkbox"
        className="form-checkbox-control"
        checked={checked}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-describedby={ariaDescribedby}
        data-cy={id}
      />
    </label>
  );
};

export default FormCheckbox;
