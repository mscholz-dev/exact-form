import React, { FC } from "react";
import FormCheckbox from "../Form/FormCheckbox";
import useTranslation from "next-translate/useTranslation";
import FormClass from "../../../utils/Form";

// interfaces
import { ITableBody } from "../../../utils/interfaces";

// classes
const Form = new FormClass();

const TableBody: FC<ITableBody> = ({
  body,
  selected,
  setSelected,
}) => {
  const { t } = useTranslation();

  return (
    <tbody className="table-body">
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

          {[...(row as keyof object)].map(
            (column: string, index) => (
              <td
                key={index}
                className="table-body-column"
                title={column}
              >
                {column}
              </td>
            ),
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
