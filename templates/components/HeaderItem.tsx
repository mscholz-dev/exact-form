import React, { FC } from "react";
import Link from "next/link";

// interfaces
import { IHeaderItem } from "../../utils/interface";

const HeaderItem: FC<IHeaderItem> = ({
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
