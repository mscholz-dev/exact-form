import React, { FC } from "react";
import Link from "next/link";
import Avatar from "./Avatar";

// interfaces
import { IHeaderItem } from "../../utils/interfaces";

const HeaderItem: FC<IHeaderItem> = ({
  url,
  pathname,
  title,
  avatar,
}) => {
  return (
    <>
      {avatar ? (
        <Link
          href={url}
          className={`header-list-item avatar-header-container`}
        >
          <Avatar
            seed={avatar}
            className="avatar-header"
          />

          <span
            className={`link${
              pathname === url
                ? " header-list-item-active"
                : ""
            }`}
          >
            {title}
          </span>
        </Link>
      ) : (
        <Link
          href={url}
          className={`header-list-item link${
            pathname === url
              ? " header-list-item-active"
              : ""
          }`}
        >
          {title}
        </Link>
      )}
    </>
  );
};

export default HeaderItem;
