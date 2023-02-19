import React, { FC } from "react";
import FormCheckbox from "../Form/FormCheckbox";
import useTranslation from "next-translate/useTranslation";
import FormClass from "../../../utils/Form";
import DateHelperClass from "../../../utils/DateHelper";
import Tooltip from "../Tooltip/TooltipTable";
import IconTrash from "../../../public/icons/trash.svg";

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
  handleTooltipDeleteClick,
  handleTooltipEditClick,
  handleTooltipClick,
  tooltips,
  itemsId,
  tooltipDeleteLoading,
  tooltipBtnCurrentId,
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
          className={`table-body-row${
            tooltips[index]
              ? " table-body-row-active"
              : ""
          }`}
        >
          <td className="table-body-checkbox">
            <FormCheckbox
              id={`selectRow${index}`}
              handleChange={(e) =>
                Form.handleCheckboxChange(
                  e,
                  itemsId[index],
                  setSelected,
                  selected,
                )
              }
              value={
                selected[itemsId[index]] || false
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
                row.length - 1 === id ||
                row.length - 2 === id
                  ? DateHelper.parseCreatedAt(
                      value,
                      locale,
                    )
                  : value.toString()
              }
            >
              {row.length - 1 === id ||
              row.length - 2 === id
                ? DateHelper.parseCreatedAt(
                    value,
                    locale,
                  )
                : value.toString()}
            </td>
          ))}

          <td
            className="table-body-column table-body-column-tooltip"
            onClick={() =>
              handleTooltipClick(index)
            }
            data-cy={`tooltip-${index}`}
            tabIndex={
              tooltipBtnCurrentId === 0 ? 0 : -1
            }
          >
            {tooltipBtnCurrentId === 0 ? (
              <Tooltip
                index={index}
                open={tooltips[index]}
                handleEditClick={(e) =>
                  handleTooltipEditClick(e, index)
                }
                handleDeleteClick={(e) =>
                  handleTooltipDeleteClick(
                    e,
                    index,
                  )
                }
                deleteLoading={
                  tooltipDeleteLoading
                }
              />
            ) : (
              <button
                className="table-body-column-delete"
                onClick={(e) =>
                  handleTooltipDeleteClick(
                    e,
                    index,
                  )
                }
              >
                <span className="table-body-column-delete-icon">
                  <IconTrash />
                </span>
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
