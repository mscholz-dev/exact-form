import React, { FC, useState } from "react";
import FormCheckbox from "../Form/FormCheckbox";
import useTranslation from "next-translate/useTranslation";
import FormClass from "../../../utils/Form";
import DateHelperClass from "../../../utils/DateHelper";
import { AxiosError } from "axios";
import Tooltip from "../Tooltip";
import FormApi from "../../../pages/api/form";
import { toast } from "react-toastify";

// interfaces
import { ITableBody } from "../../../utils/interfaces";

// classes
const Form = new FormClass();
const DateHelper = new DateHelperClass();

const TableBody: FC<ITableBody> = ({
  keyName,
  body,
  setBody,
  selected,
  setSelected,
  locale,
  itemsId,
}) => {
  const { t } = useTranslation();

  const [tooltips, setTooltips] = useState<
    Record<number, boolean>
  >({});

  const handleTooltipClick = (index: number) => {
    const newTooltips: Record<number, boolean> =
      [];

    for (const item of Object.keys(tooltips))
      newTooltips[Number(item)] = false;

    newTooltips[index] = true;

    setTooltips(newTooltips);
  };

  const handleTooltipEditClick = (
    e: React.MouseEvent,
    index: number,
  ) => {
    e.stopPropagation();
  };

  const handleTooltipDeleteClick = async (
    e: React.MouseEvent,
    index: number,
  ) => {
    e.stopPropagation();

    try {
      await FormApi.deleteItem(
        keyName,
        itemsId[index],
      );
      return toast.success("DELETED");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        //  const errorMessage =
        //    UserValidator.errorApiMessage(
        //      err?.response?.data.message,
        //      t,
        //    );
        //  toast.error(errorMessage);
        //  setLoading(false);
        //  return;
      }

      // error not expected
      //  console.error(err);
      //  const errorMessage = t(
      //    "form:error:random",
      //  );
      //  toast.error(errorMessage);
      //  setLoading(false);
      //  return;
    }
  };

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

          <td
            className="table-body-column table-body-column-tooltip"
            onClick={() =>
              handleTooltipClick(index)
            }
          >
            <Tooltip
              index={index}
              open={tooltips[index]}
              handleEditClick={(e) =>
                handleTooltipEditClick(e, index)
              }
              handleDeleteClick={(e) =>
                handleTooltipDeleteClick(e, index)
              }
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
