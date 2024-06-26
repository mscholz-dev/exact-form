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
import { AxiosError } from "axios";
import IconLoader from "../../public/icons/loader.svg";
import UserValidatorClass from "../../utils/validators/UserValidator";

// interfaces
import { IHeader } from "../../utils/interfaces";

// types
import { THeaderData } from "../../utils/types";

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

  const [path, setPath] = useState<string>("");
  const [open, setOpen] =
    useState<boolean>(false);

  const [
    disconnectLoading,
    setDisconnectLoading,
  ] = useState<boolean>(false);

  const headerData: THeaderData = [
    {
      id: 0,
      title: t("common:header:index"),
      pathname: "",
      avatar: "",
    },
  ];

  const headerRandomData: THeaderData = [
    {
      id: 0,
      title: t("common:header:signup"),
      pathname: "signup",
      avatar: "",
    },
    {
      id: 1,
      title: t("common:header:signin"),
      pathname: "signin",
      avatar: "",
    },
  ];

  const headerClientData: THeaderData = [
    {
      id: 0,
      title: t("common:header:form"),
      pathname: "form",
      avatar: "",
    },
    {
      id: 1,
      title: t("common:header:profile"),
      pathname: "profile",
      avatar: cookie.username,
    },
  ];

  const handleDisconnect = async (
    e: MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    if (disconnectLoading) return;

    setDisconnectLoading(true);

    try {
      await UserApi.disconnection();

      if (router.pathname === "/") {
        LinkHelper.reload(router);
        return;
      }

      LinkHelper.redirect(
        null,
        router,
        locale,
        "",
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

        setDisconnectLoading(false);

        return;
      }

      // error not expected
      console.error(err);
      const errorMessage = t("form:error:random");
      toast.error(errorMessage);

      setDisconnectLoading(false);

      return;
    }
  };

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
    setPath(window.location.pathname);
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
          <Link
            href="/"
            className="header-brand"
            onClick={(e) =>
              LinkHelper.redirect(
                e,
                router,
                locale,
                "",
              )
            }
          >
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
              ({
                id,
                title,
                pathname,
                avatar,
              }) => (
                <HeaderItem
                  key={id}
                  path={path}
                  locale={locale}
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
              ({
                id,
                title,
                pathname,
                avatar,
              }) => (
                <HeaderItem
                  key={id}
                  path={path}
                  locale={locale}
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
                  {disconnectLoading ? (
                    <span className="btn-disconnect-loading">
                      <IconLoader />
                    </span>
                  ) : (
                    <span className="btn-disconnect-title">
                      {t(
                        "common:header:disconnection",
                      )}
                    </span>
                  )}
                </button>
              </div>
            )}

            <div className="btn-contact-container">
              <Link
                href="/contact"
                className="btn-contact"
                onClick={(e) =>
                  LinkHelper.redirect(
                    e,
                    router,
                    locale,
                    "contact",
                  )
                }
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
