import React, {
  useState,
  useEffect,
  FC,
  Ref,
  useRef,
} from "react";
import Link from "next/link";
import Brand from "../../public/icons/brand.svg";
import HeaderItem from "../components/HeaderItem";

interface Props {
  myRef: Ref<HTMLHeadingElement>;
}

type HeaderData = {
  id: number;
  title: string;
  url: string;
}[];

const Header: FC<Props> = ({ myRef }) => {
  const headerChildRef =
    useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listContainerRef =
    useRef<HTMLDivElement>(null);

  const [pathname, setPathname] =
    useState<string>("");
  const [open, setOpen] =
    useState<boolean>(false);

  const headerData: HeaderData = [
    {
      id: 0,
      title: "Accueil",
      url: "/",
    },
    {
      id: 1,
      title: "Documentation",
      url: "/documentation",
    },
  ];

  const headerRandomData: HeaderData = [
    {
      id: 4,
      title: "Inscription",
      url: "/register",
    },
    {
      id: 5,
      title: "Connexion",
      url: "/login",
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
              Exact Form
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
              ({ id, title, url }) => (
                <HeaderItem
                  key={id}
                  url={url}
                  pathname={pathname}
                  title={title}
                />
              ),
            )}

            {headerRandomData.map(
              ({ id, title, url }) => (
                <HeaderItem
                  key={id}
                  url={url}
                  pathname={pathname}
                  title={title}
                />
              ),
            )}

            <div className="btn-header-container">
              <Link
                href="/contact"
                className="btn-header"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
