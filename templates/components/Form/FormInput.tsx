import React, {
  useState,
  FC,
  SyntheticEvent,
  useEffect,
} from "react";
import IconEye from "../../../public/icons/eye.svg";
import IconEyeSlash from "../../../public/icons/eye-slash.svg";
import RegexClass from "../../../utils/Regex";

// interfaces
import { IFormInput } from "../../../utils/interfaces";
import { PassThrough } from "stream";

// classes
const Regex = new RegexClass();

const FormInput: FC<IFormInput> = ({
  icon,
  id,
  handleChange,
  value,
  ariaDescribedby,
  title,
  mb,
  maxLength,
  type,
  asterix,
  readOnly,
}) => {
  const defaultType = type;

  const [focus, setFocus] =
    useState<boolean>(false);
  const [inputType, setInputType] =
    useState<string>(type);

  // password validator
  const [
    atLeastOneUppercase,
    setAtLeastOneUppercase,
  ] = useState<boolean>(false);
  const [
    atLeastOneLowercase,
    setAtLeastOneLowercase,
  ] = useState<boolean>(false);
  const [atLeastOneDigit, setAtLeastOneDigit] =
    useState<boolean>(false);
  const [
    atLeastOneSpecialCharacter,
    setAtLeastOneSpecialCharacter,
  ] = useState<boolean>(false);
  const [
    atLeastHeightCharacters,
    setAtLeastHeightCharacters,
  ] = useState<boolean>(false);

  const handlePasswordValidator = () => {
    setAtLeastOneUppercase(
      Regex.passwordAtLeastOneUppercase(value),
    );

    setAtLeastOneLowercase(
      Regex.passwordAtLeastOneLowercase(value),
    );

    setAtLeastOneDigit(
      Regex.passwordAtLeastOneDigit(value),
    );

    setAtLeastOneSpecialCharacter(
      Regex.passwordAtLeastOneSpecialCharacter(
        value,
      ),
    );

    setAtLeastHeightCharacters(
      Regex.passwordAtLeastHeightCharacters(
        value,
      ),
    );
  };

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

  useEffect(() => {
    if (defaultType !== "password") return;

    handlePasswordValidator();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <label
        className={`form-input-container${
          focus ? " form-input-focus" : ""
        }${
          value.length ? " form-input-filled" : ""
        }${mb ? " form-input-mb" : ""}${
          type === "password"
            ? " form-input-password"
            : ""
        }${
          readOnly ? " form-input-read-only" : ""
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
          data-cy={id}
        />
        <span className="form-input-title">
          {title}
          {asterix ? "*" : ""}
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

      {defaultType === "password" && (
        <div>
          <span>
            {atLeastOneUppercase
              ? "TRUE"
              : "FALSE"}
          </span>
          <br />
          <span>
            {atLeastOneLowercase
              ? "TRUE"
              : "FALSE"}
          </span>
          <br />
          <span>
            {atLeastOneDigit ? "TRUE" : "FALSE"}
          </span>
          <br />
          <span>
            {atLeastOneSpecialCharacter
              ? "TRUE"
              : "FALSE"}
          </span>
          <br />
          <span>
            {atLeastHeightCharacters
              ? "TRUE"
              : "FALSE"}
          </span>
        </div>
      )}
    </>
  );
};

export default FormInput;
