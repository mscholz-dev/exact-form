import React, {
  useState,
  FC,
  ChangeEvent,
  SyntheticEvent,
} from "react";
import IconEye from "../../../public/icons/eye.svg";
import IconEyeSlash from "../../../public/icons/eye-slash.svg";

interface Props {
  icon: JSX.Element;
  id: string;
  handleChange: (
    e: ChangeEvent,
    id: string,
  ) => void;
  value: string;
  ariaDescribedby: string;
  title: string;
  mb?: boolean;
  maxLength: number;
  type: "text" | "email" | "password";
}

const FormInput: FC<Props> = ({
  icon,
  id,
  handleChange,
  value,
  ariaDescribedby,
  title,
  mb,
  maxLength,
  type,
}) => {
  const [focus, setFocus] =
    useState<boolean>(false);
  const [inputType, setInputType] =
    useState<string>(type);

  const handleFocus = (): void => setFocus(true);
  const handleBlur = (): void => setFocus(false);

  const handlePassword = (
    e: SyntheticEvent,
  ): void => {
    e.preventDefault();
    if (inputType === "password") {
      setInputType("text");
      return;
    }

    setInputType("password");
  };

  return (
    <label
      className={`form-input-container${
        focus ? " form-input-focus" : ""
      }${
        value.length ? " form-input-filled" : ""
      }${mb ? " form-input-mb" : ""}${
        type === "password"
          ? " form-input-password"
          : ""
      }`}
    >
      <span className="form-input-icon">
        {icon}
      </span>
      <input
        id={id}
        onChange={(e) => handleChange(e, id)}
        value={value}
        type={inputType}
        className="form-input-control"
        aria-describedby={ariaDescribedby}
        placeholder=""
        onFocus={handleFocus}
        onBlur={handleBlur}
        maxLength={maxLength}
      />
      <span className="form-input-title">
        {title}
      </span>

      {type === "password" && (
        <span
          tabIndex={0}
          className={`form-input-password-icon${
            inputType !== type
              ? " form-input-password-icon-slash"
              : ""
          }`}
          onClick={handlePassword}
        >
          {inputType === type ? (
            <IconEye />
          ) : (
            <IconEyeSlash />
          )}
        </span>
      )}
    </label>
  );
};

export default FormInput;
