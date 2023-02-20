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
import IconInbox from "../../../public/icons/inbox.svg";
import IconPlus from "../../../public/icons/plus.svg";
import DateHelperClass from "../../../utils/DateHelper";
import IconDatabase from "../../../public/icons/database.svg";
import FormInput from "../Form/FormInput";
import Modal from "../Modal";
import BtnLoader from "../BtnLoader";
import TooltipBtn from "../Tooltip/TooltipBtn";

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
  tooltipBtnCurrentId,
  setTooltipBtnCurrentId,
}) => {
  const { t } = useTranslation();

  // loading state
  const [editLoading, setEditLoading] =
    useState<boolean>(false);
  const [
    tooltipDeleteLoading,
    setTooltipDeleteLoading,
  ] = useState<boolean>(false);
  const [
    multipleDeleteLoading,
    setMultipleDeleteLoading,
  ] = useState<boolean>(false);
  const [
    tooltipRecoverLoading,
    setTooltipRecoverLoading,
  ] = useState<boolean>(false);
  const [
    multipleRecoverLoading,
    setMultipleRecoverLoading,
  ] = useState<boolean>(false);

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

  // tooltip btn states
  const [tooltipBtnOpen, setTooltipBtnOpen] =
    useState<boolean>(false);
  const [
    tooltipBtnLoading,
    setTooltipBtnLoading,
  ] = useState<boolean>(false);

  const handleTooltipBtnChoiceClick = async (
    e: SyntheticEvent,
    id: number,
    trash: boolean,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // close tooltipBtn
    setTooltipBtnOpen(false);

    // already the current id
    if (tooltipBtnCurrentId === id) return;

    // is loading
    if (tooltipBtnLoading) return;

    // change current id
    setTooltipBtnCurrentId(id);

    try {
      setTooltipBtnLoading(true);

      await isAuthAndGetSpecificForm(
        false,
        trash,
      );

      //reset paging
      setCurrentPage(1);

      // close current tooltip
      setTooltips({});

      // display modal
      setActiveModal(false);

      // reset contentForm
      setContentForm({});

      // reset editIndex
      setEditIndex(null);

      setTooltipBtnLoading(false);

      return;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage =
          FormValidator.errorApiMessage(
            err?.response?.data.message,
            t,
          );
        toast.error(errorMessage);

        // loading state
        setTooltipBtnLoading(false);

        return;
      }

      // error not expected
      console.error(err);
      const errorMessage = t("form:error:random");
      toast.error(errorMessage);

      // loading state
      setTooltipBtnLoading(false);

      return;
    }
  };

  const tooltipBtnItems = [
    {
      id: 0,
      icon: <IconInbox />,
      title: t("form-page-key:btn:type:inbox"),
      handleClick: handleTooltipBtnChoiceClick,
      trash: false,
    },
    {
      id: 1,
      icon: <IconTrash />,
      title: t("form-page-key:btn:type:trash"),
      handleClick: handleTooltipBtnChoiceClick,
      trash: true,
    },
  ];

  const handleTooltipClick = (index: number) => {
    const newTooltips: Record<number, boolean> =
      [];

    for (const item of Object.keys(tooltips))
      newTooltips[Number(item)] = false;

    newTooltips[index] = !tooltips[index];

    setTooltips(newTooltips);

    // delete loading state
    setTooltipDeleteLoading(false);

    // edit loading btn state
    setEditLoading(false);

    // recover loading state
    setTooltipRecoverLoading(false);
  };

  const handleTooltipRecoverClick = async (
    e: React.MouseEvent,
    index: number,
  ) => {
    e.stopPropagation();

    // edit view
    if (tooltipBtnCurrentId === 0) return;

    // prevent spamming
    if (tooltipRecoverLoading) return;

    try {
      // delete loading state
      setTooltipRecoverLoading(true);

      // not a delete with trash at false because i want a PUT method, not a DELETE
      await FormApi.recoverItem(
        keyName,
        itemsId[index],
      );

      await isAuthAndGetSpecificForm(false, true);

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
        "form-page-key:recover:success",
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

        // delete loading state
        setTooltipDeleteLoading(false);

        return;
      }

      // error not expected
      console.error(err);
      const errorMessage = t("form:error:random");
      toast.error(errorMessage);

      // delete loading state
      setTooltipDeleteLoading(false);

      return;
    }
  };

  const handleMultipleRecoverClick = async () => {
    if (multipleRecoverLoading) return;

    // delete loading state
    setMultipleRecoverLoading(true);

    const deleteItems: string[] = [];

    for (const item in selected)
      if (selected[item]) deleteItems.push(item);

    // is deleteItems empty
    if (!deleteItems.length) {
      // delete loading state
      setMultipleRecoverLoading(false);
      return;
    }

    try {
      await FormApi.recoverManyItem(
        keyName,
        deleteItems,
      );

      await isAuthAndGetSpecificForm(false, true);

      // close current tooltip
      setTooltips({});

      // update countAll
      setCountAll(
        (countAll as number) - deleteItems.length,
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

      const newSelected: Record<string, boolean> =
        {};

      for (const item of itemsId)
        newSelected[item] = false;

      setSelected(newSelected);

      // if all data has been deleted
      if (newBody.length === 0 && currentPage > 1)
        setCurrentPage(currentPage - 1);

      const successMessage = t(
        "form-page-key:recover:many:success",
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

        // delete loading state
        setMultipleRecoverLoading(false);

        return;
      }

      // error not expected
      console.error(err);
      const errorMessage = t("form:error:random");
      toast.error(errorMessage);

      // delete loading state
      setMultipleRecoverLoading(false);

      return;
    }
  };

  const handleTooltipEditClick = (
    e: React.MouseEvent,
    index: number,
  ) => {
    e.stopPropagation();

    // recover view
    if (tooltipBtnCurrentId === 1) return;

    // store current edit index
    setEditIndex(index);

    // close current tooltip
    setTooltips({});

    // display modal
    setActiveModal(true);

    // reset selected rows
    setSelectAll(false);

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
    Object.keys(items[index].data).forEach(
      (key) =>
        (newContentForm[key] =
          items[index].data[key as keyof object]),
    );

    setContentForm(newContentForm);
  };

  const handleTooltipDeleteClick = async (
    e: React.MouseEvent,
    index: number,
  ): Promise<void> => {
    e.stopPropagation();

    if (tooltipDeleteLoading) return;

    try {
      // delete loading state
      setTooltipDeleteLoading(true);

      await FormApi.deleteItem(
        keyName,
        itemsId[index],
        // trash boolean
        tooltipBtnCurrentId === 1,
      );

      await isAuthAndGetSpecificForm(
        false,
        // trash boolean
        tooltipBtnCurrentId === 1,
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

      const successMessage =
        tooltipBtnCurrentId === 0
          ? t("form-page-key:trash:success")
          : t("form-page-key:delete:success");
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

        // delete loading state
        setTooltipDeleteLoading(false);

        return;
      }

      // error not expected
      console.error(err);
      const errorMessage = t("form:error:random");
      toast.error(errorMessage);

      // delete loading state
      setTooltipDeleteLoading(false);

      return;
    }
  };

  const handleMultipleDeleteClick =
    async (): Promise<void> => {
      if (multipleDeleteLoading) return;

      // delete loading state
      setMultipleDeleteLoading(true);

      const deleteItems: string[] = [];

      for (const item in selected)
        if (selected[item])
          deleteItems.push(item);

      // is deleteItems empty
      if (!deleteItems.length) {
        // delete loading state
        setMultipleDeleteLoading(false);
        return;
      }

      console.log(deleteItems.length);

      const deleteItemsQuery = `${deleteItems.join(
        "=true&",
      )}=true`;

      try {
        await FormApi.deleteManyItem(
          keyName,
          deleteItemsQuery,
          // trash boolean
          tooltipBtnCurrentId === 1,
        );

        await isAuthAndGetSpecificForm(
          false,
          // trash boolean
          tooltipBtnCurrentId === 1,
        );

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

        const successMessage =
          tooltipBtnCurrentId === 0
            ? t(
                "form-page-key:trash:many:success",
              )
            : t(
                "form-page-key:delete:many:success",
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

          // delete loading state
          setMultipleDeleteLoading(false);

          return;
        }

        // error not expected
        console.error(err);
        const errorMessage = t(
          "form:error:random",
        );
        toast.error(errorMessage);

        // delete loading state
        setMultipleDeleteLoading(false);

        return;
      }
    };

  const handleEditSubmit = async (
    e: SyntheticEvent,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // not in inbox view
    if (tooltipBtnCurrentId === 1) return;

    if (
      Object.values(
        items[editIndex as number].data,
      ).toString() ===
      Object.values(contentForm).toString()
    )
      return;

    if (editLoading) return;

    try {
      // edit loading btn state
      setEditLoading(true);

      await FormApi.editItem(
        keyName,
        itemsId[editIndex as number],
        contentForm,
      );

      await isAuthAndGetSpecificForm(
        false,
        // already to false because can't edit in trash
        false,
      );

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

      return;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const errorMessage =
          FormValidator.errorApiMessage(
            err?.response?.data.message,
            t,
          );
        toast.error(errorMessage);

        // edit loading btn state
        setEditLoading(false);

        return;
      }

      // error not expected
      console.error(err);
      const errorMessage = t("form:error:random");
      toast.error(errorMessage);

      // edit loading btn state
      setEditLoading(false);

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

  useEffect(() => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, itemsId]);

  // reset delete many btn
  useEffect(() => {
    // delete loading state
    setMultipleDeleteLoading(false);

    // recover loading state
    setMultipleRecoverLoading(false);
  }, [selected, selectAll]);

  return (
    <Wrapper className="wrapper-table-container">
      <div className="table-title-header">
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

        <TooltipBtn
          open={tooltipBtnOpen}
          setOpen={setTooltipBtnOpen}
          items={tooltipBtnItems}
          currentId={tooltipBtnCurrentId}
          loading={tooltipBtnLoading}
        />
      </div>

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
          {multipleDeleteLoading ? (
            <span className="btn-delete-loading">
              <IconLoader />
            </span>
          ) : (
            <>
              <span className="btn-delete-icon">
                <IconTrash />
              </span>
              <span className="btn-delete-title">
                {t("form-page-key:btn:delete")}
              </span>
            </>
          )}
        </button>

        <button
          className={`btn-recover${
            Object.values(selected).some(
              (boolean) => boolean === true,
            ) && tooltipBtnCurrentId === 1
              ? " btn-recover-active"
              : ""
          }`}
          onClick={handleMultipleRecoverClick}
          data-cy="table-btn-recover"
        >
          {multipleRecoverLoading ? (
            <span className="btn-recover-loading">
              <IconLoader />
            </span>
          ) : (
            <>
              <span className="btn-recover-icon">
                <IconPlus />
              </span>
              <span className="btn-recover-title">
                {t("form-page-key:btn:recover")}
              </span>
            </>
          )}
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
                tooltipBtnCurrentId={
                  tooltipBtnCurrentId
                }
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
                tooltipDeleteLoading={
                  tooltipDeleteLoading
                }
                tooltipBtnCurrentId={
                  tooltipBtnCurrentId
                }
                handleTooltipRecoverClick={
                  handleTooltipRecoverClick
                }
                recoverLoading={
                  tooltipRecoverLoading
                }
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
                        items[editIndex]
                          .created_at,
                        locale,
                      )}
                    </h2>

                    <h2 className="modal-title">
                      {t(
                        "form-page-key:table:header:updatedAt",
                      )}{" "}
                      {DateHelper.parseCreatedAt(
                        items[editIndex]
                          .updated_at,
                        locale,
                      )}
                    </h2>
                    <form
                      method="PUT"
                      onSubmit={handleEditSubmit}
                    >
                      {Object.keys(
                        items[editIndex].data,
                      ).map((key) => (
                        <FormInput
                          key={key}
                          icon={<IconDatabase />}
                          id={key}
                          handleChange={(e) =>
                            Form.handleChange(
                              e,
                              key,
                              setContentForm,
                              contentForm,
                            )
                          }
                          value={contentForm[key]}
                          ariaDescribedby={`${t(
                            "form-page-key:input:edit:ariaDescribedby",
                          )} ${key}`}
                          title={key}
                          mb
                          maxLength={1000}
                          type="text"
                        />
                      ))}

                      <BtnLoader
                        loading={editLoading}
                        text={t(
                          "form-page-key:modal:btn:edit",
                        )}
                        disabled={
                          Object.values(
                            items[editIndex].data,
                          ).toString() ===
                          Object.values(
                            contentForm,
                          ).toString()
                        }
                      />
                    </form>

                    <div className="modal-data">
                      <h3 className="modal-data-title">
                        {t(
                          "form-page-key:modal:user_agent",
                        )}
                      </h3>
                      <p className="modal-data-text">
                        {items[editIndex]
                          .user_agent !== ""
                          ? items[editIndex]
                              .user_agent
                          : t(
                              "form-page-key:modal:noData",
                            )}
                      </p>

                      <h3 className="modal-data-title">
                        {t(
                          "form-page-key:modal:referer_url",
                        )}
                      </h3>
                      <p className="modal-data-text">
                        {items[editIndex]
                          .referer_url !== ""
                          ? items[editIndex]
                              .referer_url
                          : t(
                              "form-page-key:modal:noData",
                            )}
                      </p>

                      <h3 className="modal-data-title">
                        {t(
                          "form-page-key:modal:geo_localisation",
                        )}
                      </h3>
                      <p className="modal-data-text">
                        {items[editIndex]
                          .geo_localisation
                          .city !== "" &&
                        items[editIndex]
                          .geo_localisation
                          .region !== "" &&
                        items[editIndex]
                          .geo_localisation
                          .country !== ""
                          ? `${items[editIndex].geo_localisation.city} / ${items[editIndex].geo_localisation.region} / ${items[editIndex].geo_localisation.country}`
                          : t(
                              "form-page-key:modal:noData",
                            )}
                      </p>
                    </div>
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
