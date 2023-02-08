import React, { FC, useState } from "react";
import IconChevron from "../../../public/icons/chevron.svg";

// interfaces
import { IFormSelect } from "../../../utils/interface";

const FormSelect: FC<IFormSelect> = ({
  id,
  defaultTitle,
  ariaDescribedby,
  icon,
  options,
  handleChange,
  value,
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
        onChange={(e) => handleChange(e, id)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        aria-describedby={ariaDescribedby}
        data-cy={id}
      >
        <option
          className="form-select-option"
          value=""
        >
          {defaultTitle}
        </option>
        {options.map(({ name }, index) => (
          <option
            key={index}
            className="form-select-option"
            value={name}
            aria-describedby={name.replace(
              "_",
              " ",
            )}
          >
            {name.replace("_", " ")}
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
