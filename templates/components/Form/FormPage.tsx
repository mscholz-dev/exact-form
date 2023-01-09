import React, {
  useRef,
  useEffect,
  FC,
} from "react";

interface Props {
  children: JSX.Element;
  largeForm?: boolean;
  noContainer?: boolean;
}

const FormPage: FC<Props> = ({
  children,
  largeForm,
  noContainer,
}) => {
  const articleRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);

  const handleResize = (): void => {
    if (!articleRef.current || !asideRef.current)
      return;

    if (window.innerWidth < 768) {
      asideRef.current.style.height = `${
        window.innerHeight -
        articleRef.current.offsetHeight -
        96 -
        24
      }px`;
      return;
    }

    asideRef.current.style.height = `100vh`;
  };

  useEffect((): void => {
    handleResize();
    window.addEventListener(
      "resize",
      handleResize,
    );
  }, []);

  return (
    <section className="form-page-main">
      <article
        ref={articleRef}
        className={`form-page-form px-2${
          largeForm ? " form-page-form-large" : ""
        }`}
      >
        {noContainer ? (
          children
        ) : (
          <div>{children}</div>
        )}
      </article>

      <aside
        ref={asideRef}
        className="form-page-aside"
      ></aside>
    </section>
  );
};

export default FormPage;
