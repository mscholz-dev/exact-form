import React, { FC } from "react";

// interfaces
import { ICardPage } from "../../../utils/interface";
import CardForm from "./CardForm";

const CardPage: FC<ICardPage> = ({
  locale,
  items,
}) => {
  return (
    <section>
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
    </section>
  );
};

export default CardPage;
