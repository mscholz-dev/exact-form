import React, {
  FC,
  SyntheticEvent,
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
import NoDataFound from "../NoDataFound";
import IconTrash from "../../../public/icons/trash.svg";
import DateHelperClass from "../../../utils/DateHelper";
import IconDatabase from "../../../public/icons/database.svg";
import FormInput from "../Form/FormInput";
import Modal from "../Modal";

// interfaces
import { ITable } from "../../../utils/interfaces";

// types
import { TTableBox } from "../../../utils/types";

// classes
const Form = new FormClass();
const FormValidator = new FormValidatorClass();
const DateHelper = new DateHelperClass();

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
  isAuthAndGetSpecificForm,
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

  const [activeModal, setActiveModal] =
    useState<boolean>(false);

  const [contentForm, setContentForm] = useState<
    Record<string, string>
  >({});

  const [editIndex, setEditIndex] = useState<
    null | number
  >(null);

  const [editBody, setEditBody] =
    useState<TTableBox>([]);

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

    // store current edit index
    setEditIndex(index);

    // close current tooltip
    setTooltips({});

    // display modal
    setActiveModal(true);

    // reset selected rows
    setSelectAll(false);

    // create editBody
    // remove reference
    const newBody = [...body];
    setEditBody(newBody[index]);

    const newSelected: Record<string, boolean> =
      {};

    for (const item of itemsId)
      newSelected[item] = false;

    setSelected(newSelected);

    // delete header reference
    const newHeader = [...header];

    // remove created_at and updated_at from contentForm
    newHeader.pop();
    newHeader.pop();

    // created content form structure
    const newContentForm: Record<string, string> =
      {};
    for (let i = 0; i < newHeader.length; i++)
      newContentForm[newHeader[i].value] =
        body[index][i].value;

    setContentForm(newContentForm);
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

      await isAuthAndGetSpecificForm();

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

      // reset selected rows
      setSelectAll(false);

      const newSelected: Record<string, boolean> =
        {};

      for (const item of itemsId)
        newSelected[item] = false;

      setSelected(newSelected);

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

  const handleMultipleDeleteClick =
    async (): Promise<void> => {
      const deleteItems: string[] = [];

      for (const item in selected)
        if (selected[item])
          deleteItems.push(item);

      // is deleteItems empty
      if (!deleteItems.length) return;

      const deleteItemsQuery = `${deleteItems.join(
        "=true&",
      )}=true`;

      try {
        await FormApi.deleteManyItem(
          keyName,
          deleteItemsQuery,
        );

        await isAuthAndGetSpecificForm();

        // close current tooltip
        setTooltips({});

        // update countAll
        setCountAll(
          (countAll as number) -
            deleteItems.length,
        );

        // remove deleted items id and body
        const newItemsId = [];
        const newBody = [];

        for (let i = 0; i < itemsId.length; i++) {
          if (!deleteItems.includes(itemsId[i])) {
            newItemsId.push(itemsId[i]);
            newBody.push(body[i]);
          }
        }

        setItemsId(newItemsId);
        setBody(newBody);

        // reset selected rows
        setSelectAll(false);

        const newSelected: Record<
          string,
          boolean
        > = {};

        for (const item of itemsId)
          newSelected[item] = false;

        setSelected(newSelected);

        // if all data has been deleted
        if (
          newBody.length === 0 &&
          currentPage > 1
        )
          setCurrentPage(currentPage - 1);

        const successMessage = t(
          "form-page-key:delete:many:success",
        );
        toast.success(successMessage);
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
        const errorMessage = t(
          "form:error:random",
        );
        toast.error(errorMessage);
        return;
      }
    };

  const handleEditSubmit = async (
    e: SyntheticEvent,
  ) => {
    e.preventDefault();

    try {
      await FormApi.editItem(
        keyName,
        itemsId[editIndex as number],
        contentForm,
      );

      await isAuthAndGetSpecificForm();

      // close current tooltip
      setTooltips({});

      // reset selected rows
      setSelectAll(false);

      const newSelected: Record<string, boolean> =
        {};

      for (const item of itemsId)
        newSelected[item] = false;

      setSelected(newSelected);

      // hide modal
      setActiveModal(false);

      // reset contentForm
      setContentForm({});

      // reset editIndex
      setEditIndex(null);

      const successMessage = t(
        "form-page-key:edit:success",
      );
      toast.success(successMessage);
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
    const newSelected: Record<string, boolean> =
      {};

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

    // add updated_at column
    newHeader.push({
      id: newHeader.length,
      value: "updated_at",
    });

    // create body with empty data
    for (const object of items) {
      // add items id in order
      newItemsId.push(object.id);

      const bodyItem = [];

      for (const { value } of newHeader) {
        if (
          value !== "created_at" &&
          value !== "updated_at"
        ) {
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

      let newUpdatedAt = new Date(
        object.updated_at,
      );

      // add timezone offset to created_at and updated_at data
      timezoneData.some(({ name, offset }) => {
        if (name === timezone) {
          newCreatedAt.setHours(
            newCreatedAt.getHours() + offset - 1,
          );

          newUpdatedAt.setHours(
            newUpdatedAt.getHours() + offset - 1,
          );
          return;
        }
      }),
        // push created_at data
        bodyItem.push({
          id: bodyItem.length,
          value: newCreatedAt.toString(),
        });

      // push updated_at data
      bodyItem.push({
        id: bodyItem.length,
        value: newUpdatedAt.toString(),
      });

      newBody.push(bodyItem);

      // add selectable checkbox
      newSelected[object.id] = false;
    }

    // trigger state render
    setHeader(newHeader);
    setBody(newBody);
    setItemsId(newItemsId);
    setSelected(newSelected);
    setSelectAll(false);

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

      <div className="table-btn">
        <button
          className={`btn-delete${
            Object.values(selected).some(
              (boolean) => boolean === true,
            )
              ? " btn-delete-active"
              : ""
          }`}
          onClick={handleMultipleDeleteClick}
          data-cy="table-btn-delete"
        >
          <span className="btn-delete-icon">
            <IconTrash />
          </span>
          <span className="btn-delete-title">
            {t("form-page-key:btn:delete")}
          </span>
        </button>
      </div>

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
                itemsId={itemsId}
              />
            </table>

            <Paging
              current={currentPage}
              setCurrent={setCurrentPage}
              max={maxPage}
            />

            <Modal
              active={activeModal}
              setActive={setActiveModal}
              content={
                editIndex !== null ? (
                  <>
                    <h2 className="modal-title">
                      {t(
                        "form-page-key:table:header:createdAt",
                      )}{" "}
                      {DateHelper.parseCreatedAt(
                        body[editIndex][
                          body[editIndex].length -
                            2
                        ].value,
                        locale,
                      )}
                    </h2>

                    <h2 className="modal-title">
                      {t(
                        "form-page-key:table:header:updatedAt",
                      )}{" "}
                      {DateHelper.parseCreatedAt(
                        body[editIndex][
                          body[editIndex].length -
                            1
                        ].value,
                        locale,
                      )}
                    </h2>
                    <form
                      method="PUT"
                      onSubmit={handleEditSubmit}
                    >
                      {editBody.map(({ id }) => {
                        if (
                          header[id].value ===
                            "created_at" ||
                          header[id].value ===
                            "updated_at"
                        )
                          return;

                        return (
                          <FormInput
                            key={id}
                            icon={
                              <IconDatabase />
                            }
                            id={header[id].value}
                            handleChange={(e) =>
                              Form.handleChange(
                                e,
                                header[id].value,
                                setContentForm,
                                contentForm,
                              )
                            }
                            value={
                              contentForm[
                                header[id].value
                              ]
                            }
                            ariaDescribedby={`${t(
                              "form-page-key:input:edit:ariaDescribedby",
                            )} ${
                              header[id].value
                            }`}
                            title={
                              header[id].value
                            }
                            mb
                            maxLength={100}
                            type="text"
                          />
                        );
                      })}

                      <button
                        className="btn-modal-edit"
                        data-cy="modal-btn-edit"
                      >
                        {t(
                          "form-page-key:btn:edit",
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <></>
                )
              }
            />
          </>
        )}
    </Wrapper>
  );
};

export default Table;
