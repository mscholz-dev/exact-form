import React, { FC } from "react";
import Link from "next/link";
import Avatar from "./Avatar";
import LinkHelperClass from "../../utils/LinkHelper";
import { useRouter } from "next/router";

// interfaces
import { IHeaderItem } from "../../utils/interfaces";

// classes
const LinkHelper = new LinkHelperClass();

const HeaderItem: FC<IHeaderItem> = ({
  locale,
  path,
  pathname,
  title,
  avatar,
}) => {
  const router = useRouter();

  return (
    <>
      {avatar ? (
        <Link
          href={LinkHelper.translate(
            locale,
            pathname,
          )}
          className={`header-list-item avatar-header-container`}
          onClick={(e) =>
            LinkHelper.redirect(
              e,
              router,
              locale,
              pathname,
            )
          }
        >
          <Avatar
            seed={avatar}
            className="avatar-header"
          />

          <span
            className={`link${
              LinkHelper.translate(
                locale,
                pathname,
              ) === path
                ? " header-list-item-active"
                : ""
            }`}
          >
            {title}
          </span>
        </Link>
      ) : (
        <Link
          href={LinkHelper.translate(
            locale,
            pathname,
          )}
          className={`header-list-item link${
            LinkHelper.translate(
              locale,
              pathname,
            ) === path
              ? " header-list-item-active"
              : ""
          }`}
          onClick={(e) =>
            LinkHelper.redirect(
              e,
              router,
              locale,
              pathname,
            )
          }
        >
          {title}
        </Link>
      )}
    </>
  );
};

export default HeaderItem;
