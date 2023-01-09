import React, { FC } from "react";
import Link from "next/link";

interface Props {
  url: string;
  pathname: string;
  title: string;
}

const HeaderItem: FC<Props> = ({
  url,
  pathname,
  title,
}) => {
  return (
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
  );
};

export default HeaderItem;
