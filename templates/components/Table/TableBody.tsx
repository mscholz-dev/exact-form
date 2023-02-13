import React, { FC } from "react";
import FormCheckbox from "../Form/FormCheckbox";
import useTranslation from "next-translate/useTranslation";
import FormClass from "../../../utils/Form";
import DateHelperClass from "../../../utils/DateHelper";

// interfaces
import { ITableBody } from "../../../utils/interfaces";

// classes
const Form = new FormClass();
const DateHelper = new DateHelperClass();

const TableBody: FC<ITableBody> = ({
  body,
  selected,
  setSelected,
  locale,
}) => {
  const { t } = useTranslation();

  return (
    <tbody
      className="table-body"
      data-cy="table-body"
    >
      {body.map((row, index) => (
        <tr
          key={index}
          className="table-body-row"
        >
          <td className="table-body-checkbox">
            <FormCheckbox
              id={`selectRow${index}`}
              handleChange={(e) =>
                Form.handleCheckboxChange(
                  e,
                  `selectRow${index}`,
                  setSelected,
                  selected,
                )
              }
              value={
                selected[`selectRow${index}`]
              }
              ariaDescribedby={t(
                "form-page-key:table:body:ariaDescribedby",
              )}
              small
            />
          </td>

          {row.map(({ id, value }) => (
            <td
              key={id}
              className="table-body-column"
              title={
                row.length - 1 === id
                  ? DateHelper.parseCreatedAt(
                      value,
                      locale,
                    )
                  : value.toString()
              }
            >
              {row.length - 1 === id
                ? DateHelper.parseCreatedAt(
                    value,
                    locale,
                  )
                : value.toString()}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
