import React, {
  useState,
  useEffect,
  FC,
  useRef,
  MouseEvent,
} from "react";
import Link from "next/link";
import Brand from "../../public/icons/brand.svg";
import HeaderItem from "../components/HeaderItem";
import useTranslation from "next-translate/useTranslation";
// import setLanguage from "next-translate/setLanguage";
import LinkHelperClass from "../../utils/LinkHelper";
import { toast } from "react-toastify";
import UserApi from "../../pages/api/user";
import { useRouter } from "next/router";
import UserValidatorClass from "../../utils/validator/UserValidator";

// interfaces
import { IHeader } from "../../utils/interface";

// types
import { THeaderData } from "../../utils/type";
import { AxiosError } from "axios";

// classes
const LinkHelper = new LinkHelperClass();
const UserValidator = new UserValidatorClass();

const Header: FC<IHeader> = ({
  myRef,
  cookie,
  locale,
}) => {
  const { t } = useTranslation("common");

  const router = useRouter();

  const headerChildRef =
    useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listContainerRef =
    useRef<HTMLDivElement>(null);

  const [pathname, setPathname] =
    useState<string>("");
  const [open, setOpen] =
    useState<boolean>(false);

  const headerData: THeaderData = [
    {
      id: 0,
      title: t("common:header:index"),
      url: LinkHelper.translate(locale, ""),
      avatar: "",
    },
  ];

  const headerRandomData: THeaderData = [
    {
      id: 0,
      title: t("common:header:signup"),
      url: LinkHelper.translate(locale, "signup"),
      avatar: "",
    },
    {
      id: 1,
      title: t("common:header:signin"),
      url: LinkHelper.translate(locale, "signin"),
      avatar: "",
    },
  ];

  const handleDisconnect = async (
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    try {
      await UserApi.disconnection();

      if (router.pathname === "/") {
        router.reload();
        return;
      }

      router.push(
        LinkHelper.translate(locale, ""),
        undefined,
        { shallow: false },
      );

      return;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage =
          UserValidator.errorApiMessage(
            err?.response?.data.message,
            t,
          );

        toast.error(errorMessage);
        return;
      }

      // error not expected
      console.error(err);
      const errorMessage = t("form:error:random");
      toast.error(errorMessage);
    }
  };

  const headerClientData: THeaderData = [
    {
      id: 0,
      title: t("common:header:profile"),
      url: LinkHelper.translate(
        locale,
        "profile",
      ),
      avatar: cookie.username,
    },
  ];

  const handleHeaderSize = (
    isOpen?: boolean | undefined,
  ) => {
    const headerHeight = "56px";

    if (
      !headerChildRef.current ||
      !listRef.current ||
      !listContainerRef.current
    )
      return;

    const headerRef =
      headerChildRef.current.parentElement;

    if (!headerRef) return;

    if (window.innerWidth > 768) {
      setOpen(false);
      headerRef.style.height = headerHeight;
      listRef.current.style.height = headerHeight;
      listContainerRef.current.style.height =
        headerHeight;
      return;
    }

    if (isOpen === undefined) {
      if (
        headerRef.style.height === headerHeight &&
        listRef.current.style.height ===
          headerHeight &&
        listContainerRef.current.style.height ===
          headerHeight
      ) {
        headerRef.style.height = headerHeight;
        listRef.current.style.height = "0px";
        listContainerRef.current.style.height =
          headerHeight;
        return;
      }

      return;
    }

    if (!isOpen) {
      headerRef.style.height = headerHeight;
      listRef.current.style.height = "0px";
      listContainerRef.current.style.height =
        headerHeight;
      return;
    }

    let listHeight = 0;

    for (const child of listContainerRef.current
      .children as HTMLCollectionOf<HTMLDivElement>) {
      listHeight += child.offsetHeight;
    }

    headerRef.style.height = `calc(${headerHeight} + ${listHeight}px + 12px)`;
    listRef.current.style.height = `${listHeight}px`;
    listContainerRef.current.style.height = `${listHeight}px`;
  };

  const handleBurger = () => {
    setOpen(!open);
    handleHeaderSize(!open);
  };

  useEffect((): void => {
    setPathname(window.location.pathname);
    window.addEventListener("resize", () =>
      handleHeaderSize(),
    );
  }, []);

  return (
    <header
      ref={myRef}
      className={`header${
        open ? " header-open" : ""
      }`}
    >
      <div
        ref={headerChildRef}
        className="header-container"
      >
        <div className="header-brand-wrapper">
          <Link href="/" className="header-brand">
            <span className="header-brand-logo">
              <Brand />
            </span>
            <span className="header-brand-label">
              {t("common:brand:title")}
            </span>
          </Link>

          <button
            className="header-burger"
            onClick={handleBurger}
          >
            <span />
            <span />
          </button>
        </div>

        <div
          ref={listRef}
          className="header-list"
        >
          <div
            ref={listContainerRef}
            className="header-list-container"
          >
            {headerData.map(
              ({ id, title, url, avatar }) => (
                <HeaderItem
                  key={id}
                  url={url}
                  pathname={pathname}
                  title={title}
                  avatar={avatar}
                />
              ),
            )}

            {(!cookie.role
              ? headerRandomData
              : headerClientData
            ).map(
              ({ id, title, url, avatar }) => (
                <HeaderItem
                  key={id}
                  url={url}
                  pathname={pathname}
                  title={title}
                  avatar={avatar}
                />
              ),
            )}

            {cookie.role && (
              <div>
                <button
                  className="btn-disconnect"
                  onClick={handleDisconnect}
                  data-cy="btn-disconnection"
                >
                  {t(
                    "common:header:disconnection",
                  )}
                </button>
              </div>
            )}

            <div className="btn-contact-container">
              <Link
                href="/contact"
                className="btn-contact"
              >
                {t("common:header:contact")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
