import React, { FC, useState } from "react";
import IconChevron from "../../../public/icons/chevron.svg";

// interfaces
import { IFormSelect } from "../../../utils/interface";

const FormSelect: FC<IFormSelect> = ({
  id,
  defaultTitle,
  icon,
  options,
}) => {
  const [focus, setFocus] =
    useState<boolean>(false);

  const handleFocus = (): void => setFocus(true);
  const handleBlur = (): void => setFocus(false);

  return (
    <div
      className={`form-select${
        focus ? " form-select-focus" : ""
      }`}
    >
      <select
        className="form-select-control"
        name={id}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <option
          className="form-select-option"
          value="default"
        >
          {defaultTitle}
        </option>
        {options.map((value, index) => (
          <option
            key={index}
            className="form-select-option"
            value={value}
          >
            {value}
          </option>
        ))}
      </select>

      <span className="form-select-icon">
        {icon}
      </span>

      <span className="form-select-arrow">
        <IconChevron />
      </span>
    </div>
  );
};

export default FormSelect;
