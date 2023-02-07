import React, { FC } from "react";
import IconPlus from "../../../public/icons/plus.svg";
import CardForm from "./CardForm";
import Wrapper from "../../layouts/Wrapper";

// interfaces
import { ICardPage } from "../../../utils/interface";

const CardPage: FC<ICardPage> = ({
  locale,
  items,
  title,
  createTitle,
}) => {
  return (
    <Wrapper className="card-page wrapper-card-container">
      <article className="card-page-header">
        <h1 className="card-page-title">
          <span className="card-page-title-label">
            {title}
          </span>
          <span className="card-page-title-number">
            ({items.length})
          </span>
        </h1>

        <button className="btn-create">
          <span className="btn-create-icon">
            <IconPlus />
          </span>
          <span className="btn-create-title">
            {createTitle}
          </span>
        </button>
      </article>

      <article className="card-page-items">
        {items.map(
          (
            { name, key, timezone, items, owner },
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
      </article>
    </Wrapper>
  );
};

export default CardPage;
