import React, { FC } from "react";
import IconPlus from "../../../public/icons/plus.svg";
import CardForm from "./CardForm";
import Wrapper from "../../layouts/Wrapper";
import Link from "next/link";
import LinkHelperClass from "../../../utils/LinkHelper";
import Paging from "../Paging";
import NoDataFound from "../NoDataFound";
import CardFormSkeleton from "./CardFormSkeleton";
import { useRouter } from "next/router";

// interfaces
import { ICardPage } from "../../../utils/interfaces";

// classes
const LinkHelper = new LinkHelperClass();

const CardPage: FC<ICardPage> = ({
  locale,
  items,
  title,
  createTitle,
  currentPage,
  setCurrentPage,
  maxPage,
  creationPathname,
  countAll,
  noDataFoundTitle,
  loading,
}) => {
  const router = useRouter();

  return (
    <Wrapper className="card-page wrapper-card-container">
      <article className="card-page-header">
        <h1 className="card-page-title">
          <span className="card-page-title-label">
            {title}
          </span>
          <span className="card-page-title-number">
            ({countAll || 0})
          </span>
        </h1>

        <Link
          href={LinkHelper.translate(
            locale,
            creationPathname,
          )}
          className="btn-create"
          onClick={(e) =>
            LinkHelper.redirect(
              e,
              router,
              locale,
              creationPathname,
            )
          }
        >
          <span className="btn-create-icon">
            <IconPlus />
          </span>
          <span className="btn-create-title">
            {createTitle}
          </span>
        </Link>
      </article>

      <article
        className="card-page-items"
        data-cy="article"
      >
        {loading && (
          <>
            {[...Array(8)].map(
              (__: undefined, index) => (
                <CardFormSkeleton key={index} />
              ),
            )}
          </>
        )}

        {!loading &&
          countAll !== null &&
          items.length === 0 && (
            <NoDataFound
              title={noDataFoundTitle}
              largeTXS
            />
          )}

        {!loading &&
          countAll !== null &&
          items.length !== 0 && (
            <>
              {items.map(
                (
                  {
                    name,
                    key,
                    timezone,
                    items,
                    owner,
                  },
                  index,
                ) => (
                  <CardForm
                    key={index}
                    name={name}
                    keyName={key}
                    timezone={timezone}
                    items={items}
                    owner={owner}
                    locale={locale}
                  />
                ),
              )}
            </>
          )}
      </article>

      <Paging
        current={currentPage}
        setCurrent={setCurrentPage}
        max={maxPage}
      />
    </Wrapper>
  );
};

export default CardPage;
