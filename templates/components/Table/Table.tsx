import React, {
  FC,
  useEffect,
  useState,
} from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import FormClass from "../../../utils/Form";
import Paging from "../Paging";
import Wrapper from "../../layouts/Wrapper";
import IconLoader from "../../../public/icons/loader.svg";
import timezoneData from "../../../utils/timezone.json";
import { toast } from "react-toastify";
import FormApi from "../../../pages/api/form";
import { AxiosError } from "axios";
import FormValidatorClass from "../../../utils/validators/FormValidator";
import useTranslation from "next-translate/useTranslation";

// interfaces
import { ITable } from "../../../utils/interfaces";

// types
import { TTableBox } from "../../../utils/types";
import NoDataFound from "../NoDataFound";

// classes
const Form = new FormClass();
const FormValidator = new FormValidatorClass();

const Table: FC<ITable> = ({
  keyName,
  items,
  title,
  countAll,
  setCountAll,
  currentPage,
  setCurrentPage,
  maxPage,
  noDataFoundTitle,
  loading,
  locale,
  timezone,
}) => {
  const { t } = useTranslation();

  const [header, setHeader] = useState<TTableBox>(
    [],
  );
  const [body, setBody] = useState<TTableBox[]>(
    [],
  );
  const [itemsId, setItemsId] = useState<
    string[]
  >([]);
  const [selectAll, setSelectAll] =
    useState(false);

  // type for enable new unknown object
  const [selected, setSelected] = useState<
    Record<string, boolean>
  >({
    selectAll: false,
  });

  const [tooltips, setTooltips] = useState<
    Record<number, boolean>
  >({});

  const handleTooltipClick = (index: number) => {
    const newTooltips: Record<number, boolean> =
      [];

    for (const item of Object.keys(tooltips))
      newTooltips[Number(item)] = false;

    newTooltips[index] = !tooltips[index];

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
  ): Promise<void> => {
    e.stopPropagation();

    try {
      await FormApi.deleteItem(
        keyName,
        itemsId[index],
      );

      // close current tooltip
      setTooltips({});

      // update countAll
      setCountAll((countAll as number) - 1);

      // remove deleted item id
      itemsId.splice(index, 1);
      setItemsId([...itemsId]);

      // remove deleted item
      body.splice(index, 1);
      setBody([...body]);

      // if all data has been deleted
      if (body.length === 0 && currentPage > 1)
        setCurrentPage(currentPage - 1);

      const successMessage = t(
        "form-page-key:delete:success",
      );
      toast.success(successMessage);

      return;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage =
          FormValidator.errorApiMessage(
            err?.response?.data.message,
            t,
          );
        toast.error(errorMessage);
        return;
      }

      // error not expected
      console.error(err);
      const errorMessage = t("form:error:random");
      toast.error(errorMessage);
      return;
    }
  };

  useEffect(() => {
    if (!items.length) return;

    const newHeader: TTableBox = [];
    const newBody: TTableBox[] = [];
    const newItemsId: string[] = [];

    // create table header with unique keys
    for (const object of items) {
      for (const item in object.data) {
        if (
          !newHeader.some(
            ({ value }) => value === item,
          )
        )
          newHeader.push({
            id: newHeader.length,
            value: item,
          });
      }
    }

    // add created_at column
    newHeader.push({
      id: newHeader.length,
      value: "created_at",
    });

    // create body with empty data
    for (const object of items) {
      // add items id in order
      newItemsId.push(object.id);

      const bodyItem = [];

      for (const { value } of newHeader) {
        if (value !== "created_at") {
          object.data[value as keyof object]
            ? bodyItem.push({
                id: bodyItem.length,
                value:
                  object.data[
                    value as keyof object
                  ],
              })
            : bodyItem.push({
                id: bodyItem.length,
                value: "",
              });
        }
      }

      let newCreatedAt = new Date(
        object.created_at,
      );

      // add timezone offset to created at data
      timezoneData.some(({ name, offset }) => {
        if (name === timezone) {
          newCreatedAt.setHours(
            newCreatedAt.getHours() + offset - 1,
          );
          return;
        }
      }),
        // push created at data
        bodyItem.push({
          id: bodyItem.length,
          value: newCreatedAt.toString(),
        });

      newBody.push(bodyItem);

      // add selectable checkbox
      selected[
        `selectRow${
          Object.keys(selected).length - 1
        }`
      ] = false;
    }

    // trigger header, body and items id render
    setHeader(newHeader);
    setBody(newBody);
    setItemsId(newItemsId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // handle select and unselect all
  useEffect(() => {
    const newSelected: Record<string, boolean> =
      {};

    for (const item of Object.keys(selected))
      newSelected[item] = selectAll;

    setSelected(newSelected);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAll]);

  return (
    <Wrapper className="wrapper-table-container">
      <h1 className="table-title">
        <span className="table-title-label">
          {title}
        </span>
        <span className="table-title-number">
          {countAll === null
            ? ""
            : `(${countAll})`}
        </span>
      </h1>

      {loading && (
        <span className="table-loader">
          <IconLoader />
        </span>
      )}

      {!loading &&
        countAll !== null &&
        items.length === 0 && (
          <NoDataFound title={noDataFoundTitle} />
        )}

      {!loading &&
        countAll !== null &&
        items.length !== 0 && (
          <>
            <table
              className={`table${
                maxPage <= 1
                  ? " table-margin-bottom"
                  : ""
              }`}
            >
              <TableHeader
                header={header}
                handleBooleanChange={() =>
                  Form.handleBooleanChange(
                    setSelectAll,
                    selectAll,
                  )
                }
                selectAll={selectAll}
              />
              <TableBody
                body={body}
                selected={selected}
                setSelected={setSelected}
                locale={locale}
                handleTooltipDeleteClick={
                  handleTooltipDeleteClick
                }
                handleTooltipEditClick={
                  handleTooltipEditClick
                }
                tooltips={tooltips}
                handleTooltipClick={
                  handleTooltipClick
                }
              />
            </table>

            <Paging
              current={currentPage}
              setCurrent={setCurrentPage}
              max={maxPage}
            />
          </>
        )}
    </Wrapper>
  );
};

export default Table;
