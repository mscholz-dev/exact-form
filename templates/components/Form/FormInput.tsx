import React, {
  useState,
  FC,
  SyntheticEvent,
  useEffect,
} from "react";
import IconEye from "../../../public/icons/eye.svg";
import IconEyeSlash from "../../../public/icons/eye-slash.svg";
import IconCheck from "../../../public/icons/check.svg";
import IconCross from "../../../public/icons/cross.svg";
import RegexClass from "../../../utils/Regex";
import useTranslation from "next-translate/useTranslation";

// interfaces
import { IFormInput } from "../../../utils/interfaces";

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
  regex,
}) => {
  const { t } = useTranslation();

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

  const regexValidator = [
    {
      id: 0,
      boolean: atLeastOneUppercase,
      title: t(
        "form:regex:title:atLeastOneUppercase",
      ),
    },
    {
      id: 1,
      boolean: atLeastOneLowercase,
      title: t(
        "form:regex:title:atLeastOneLowercase",
      ),
    },
    {
      id: 2,
      boolean: atLeastOneDigit,
      title: t(
        "form:regex:title:atLeastOneDigit",
      ),
    },
    {
      id: 3,
      boolean: atLeastOneSpecialCharacter,
      title: t(
        "form:regex:title:atLeastOneSpecialCharacter",
      ),
    },

    {
      id: 4,
      boolean: atLeastHeightCharacters,
      title: t(
        "form:regex:title:atLeastHeightCharacters",
      ),
    },
  ];

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
    if (!regex) return;

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

      {regex && (
        <div className="form-input-regex">
          {regexValidator.map(
            ({ id, boolean, title }) => (
              <span
                key={id}
                className="form-input-regex-item"
              >
                <span
                  className={`form-input-regex-item-icon${
                    boolean
                      ? " form-input-regex-item-icon-true"
                      : " form-input-regex-item-icon-false"
                  }`}
                >
                  {boolean ? (
                    <IconCheck />
                  ) : (
                    <IconCross />
                  )}
                </span>
                <span className="form-input-regex-item-title">
                  {title}
                </span>
              </span>
            ),
          )}
        </div>
      )}
    </>
  );
};

export default FormInput;
