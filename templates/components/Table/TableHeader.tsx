import React, { FC } from "react";
import FormCheckbox from "../Form/FormCheckbox";
import useTranslation from "next-translate/useTranslation";

// interfaces
import { ITableHeader } from "../../../utils/interfaces";

const TableHeader: FC<ITableHeader> = ({
  header,
  handleBooleanChange,
  selectAll,
}) => {
  const { t } = useTranslation();

  return (
    <thead className="table-header">
      <tr className="table-header-row">
        <th className="table-header-checkbox">
          <FormCheckbox
            id="selectAll"
            handleChange={handleBooleanChange}
            value={selectAll}
            ariaDescribedby={t(
              "form-page-key:table:header:ariaDescribedby",
            )}
            small
          />
        </th>

        {header.map(({ id, value }) => (
          <th
            key={id}
            className="table-header-column"
            title={
              value === "created_at"
                ? t(
                    "form-page-key:table:header:createdAt",
                  )
                : value === "updated_at"
                ? t(
                    "form-page-key:table:header:updatedAt",
                  )
                : value
            }
          >
            {value === "created_at"
              ? t(
                  "form-page-key:table:header:createdAt",
                )
              : value === "updated_at"
              ? t(
                  "form-page-key:table:header:updatedAt",
                )
              : value}
          </th>
        ))}

        <th className="table-header-column">
          {t(
            "form-page-key:table:header:tooltip",
          )}
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
