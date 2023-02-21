import React, {
  useEffect,
  useState,
  FC,
} from "react";
import { createAvatar } from "@dicebear/core";
import { identicon } from "@dicebear/collection";
import HTMLReactParser from "html-react-parser";

// interfaces
import { IAvatar } from "../../utils/interfaces";

const Avatar: FC<IAvatar> = ({
  seed,
  className,
}) => {
  const [avatar, setAvatar] =
    useState<string>("");

  const handleAvatar = () =>
    setAvatar(
      createAvatar(identicon, {
        seed,
      }).toString(),
    );

  useEffect(() => {
    handleAvatar();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed]);
  return (
    <span
      className={`avatar${
        className ? ` ${className}` : ""
      }`}
    >
      {HTMLReactParser(avatar)}
    </span>
  );
};

export default Avatar;
