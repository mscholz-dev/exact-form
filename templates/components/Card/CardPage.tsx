import React, {
  FC,
  SyntheticEvent,
  useState,
  useEffect,
} from "react";
import IconPlus from "../../../public/icons/plus.svg";
import CardForm from "./CardForm";
import Wrapper from "../../layouts/Wrapper";
import Link from "next/link";
import LinkHelperClass from "../../../utils/LinkHelper";
import Paging from "../Paging";
import NoDataFound from "../NoDataFound";
import CardFormSkeleton from "./CardFormSkeleton";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import FormApi from "../../../pages/api/form";
import { AxiosError } from "axios";
import FormValidatorClass from "../../../utils/validators/FormValidator";
import useTranslation from "next-translate/useTranslation";
import FormInput from "../Form/FormInput";
import FormSelect from "../Form/FormSelect";
import FormClass from "../../../utils/Form";
import IconFont from "../../../public/icons/font.svg";
import IconTimezone from "../../../public/icons/timezone.svg";
import timezone from "../../../utils/timezone.json";
import BtnLoader from "../BtnLoader";
import IconInbox from "../../../public/icons/inbox.svg";
import IconTrash from "../../../public/icons/trash.svg";
import TooltipBtn from "../Tooltip/TooltipBtn";
import Modal from "../Modal";

// interfaces
import { ICardPage } from "../../../utils/interfaces";

// classes
const LinkHelper = new LinkHelperClass();
const FormValidator = new FormValidatorClass();
const Form = new FormClass();

const CardPage: FC<ICardPage> = ({
  locale,
  items,
  title,
  createTitle,
  currentPage,
  setCurrentPage,
  maxPage,
  creationPathname,
  countAll,
  setCountAll,
  noDataFoundTitle,
  loading,
  isAuthAndGetAll,
}) => {
  const { t } = useTranslation();

  const router = useRouter();

  // loading state
  const [
    tooltipDeleteLoading,
    setTooltipDeleteLoading,
  ] = useState<boolean>(false);
  const [editLoading, setEditLoading] =
    useState<boolean>(false);

  const [tooltips, setTooltips] = useState<
    Record<number, boolean>
  >({});

  const [activeModal, setActiveModal] =
    useState<boolean>(false);

  const [contentForm, setContentForm] = useState<{
    name: string;
    timezone: string;
  }>({ name: "", timezone: "" });

  const [editIndex, setEditIndex] = useState<
    null | number
  >(null);

  // tooltip btn
  const [tooltipBtnOpen, setTooltipBtnOpen] =
    useState<boolean>(false);
  const [
    tooltipBtnLoading,
    setTooltipBtnLoading,
  ] = useState<boolean>(false);
  const [
    tooltipBtnCurrentId,
    setTooltipBtnCurrentId,
  ] = useState<number>(0);

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

      await isAuthAndGetAll(false, trash);

      //reset paging
      setCurrentPage(1);

      // close current tooltip
      setTooltips({});

      // display modal
      setActiveModal(false);

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

  const handleTooltipClick = (
    e: SyntheticEvent,
    index: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const newTooltips: Record<number, boolean> =
      [];

    for (const item of Object.keys(tooltips))
      newTooltips[Number(item)] = false;

    newTooltips[index] = !tooltips[index];

    setTooltips(newTooltips);

    setTooltipDeleteLoading(false);

    setEditLoading(false);
  };

  const handleTooltipEditClick = (
    e: SyntheticEvent,
    index: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // store current edit index
    setEditIndex(index);

    // close current tooltip
    setTooltips({});

    // display modal
    setActiveModal(true);

    // created content form structure
    setContentForm({
      name: items[index].name,
      timezone: items[index].timezone,
    });
  };

  const handleEditSubmit = async (
    e: SyntheticEvent,
  ) => {
    e.preventDefault();

    if (
      items[editIndex as number].name ===
        contentForm.name &&
      items[editIndex as number].timezone ===
        contentForm.timezone
    )
      return;

    // prevent spamming
    if (editLoading) return;
    setEditLoading(true);

    const errors =
      FormValidator.inspectUpdateFormData(
        contentForm,
        t,
      );

    if (errors.length) {
      for (const { key, message } of errors) {
        FormValidator.errorStyle(key);
        toast.error(message);
      }

      setEditLoading(false);
      return;
    }

    try {
      await FormApi.updateForm(
        items[editIndex as number].key,
        contentForm,
      );

      await isAuthAndGetAll(false, false);

      // close current tooltip
      setTooltips({});

      // hide modal
      setActiveModal(false);

      // reset contentForm
      setContentForm({ name: "", timezone: "" });

      // reset editIndex
      setEditIndex(null);

      const successMessage = t(
        "form-page:edit:success",
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

  const handleTooltipDeleteClick = async (
    e: SyntheticEvent,
    index: number,
  ): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    if (tooltipDeleteLoading) return;

    try {
      // delete loading state
      setTooltipDeleteLoading(true);

      await FormApi.deleteForm(items[index].key);

      await isAuthAndGetAll(
        false,
        // trash boolean
        tooltipBtnCurrentId === 1,
      );

      // close current tooltip
      setTooltips({});

      // update countAll
      setCountAll((countAll as number) - 1);

      // if all data has been deleted
      if (
        items.length - 1 === 0 &&
        currentPage > 1
      )
        setCurrentPage(currentPage - 1);

      const successMessage = t(
        "form-page:delete:success",
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

  useEffect(() => {
    // close current tooltip
    setTooltips({});

    // hide modal
    setActiveModal(false);

    // reset contentForm
    setContentForm({ name: "", timezone: "" });

    // reset editIndex
    setEditIndex(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <Wrapper className="card-page wrapper-card-container">
      <article className="card-page-header">
        <h1 className="card-page-title">
          <span className="card-page-title-label">
            {title}
          </span>
          <span className="card-page-title-number">
            ({countAll || 0})
          </span>
        </h1>

        <TooltipBtn
          open={tooltipBtnOpen}
          setOpen={setTooltipBtnOpen}
          items={tooltipBtnItems}
          currentId={tooltipBtnCurrentId}
          loading={tooltipBtnLoading}
        />

        <Link
          href={LinkHelper.translate(
            locale,
            creationPathname,
          )}
          className="btn-create"
          onClick={(e) =>
            LinkHelper.redirect(
              e,
              router,
              locale,
              creationPathname,
            )
          }
        >
          <span className="btn-create-icon">
            <IconPlus />
          </span>
          <span className="btn-create-title">
            {createTitle}
          </span>
        </Link>
      </article>

      <article
        className={`card-page-items${
          maxPage <= 1
            ? " card-page-items-margin-bottom"
            : ""
        }`}
        data-cy="article"
      >
        {loading && (
          <>
            {[...Array(8)].map(
              (__: undefined, index) => (
                <CardFormSkeleton key={index} />
              ),
            )}
          </>
        )}

        {!loading &&
          countAll !== null &&
          items.length === 0 && (
            <NoDataFound
              title={noDataFoundTitle}
              largeTXS
            />
          )}

        {!loading &&
          countAll !== null &&
          items.length !== 0 && (
            <>
              {items.map(
                (
                  {
                    name,
                    key,
                    timezone,
                    items,
                    owner,
                  },
                  index,
                ) => (
                  <CardForm
                    key={index}
                    index={index}
                    name={name}
                    keyName={key}
                    timezone={timezone}
                    items={items}
                    owner={owner}
                    locale={locale}
                    handleTooltipClick={
                      handleTooltipClick
                    }
                    handleTooltipEditClick={
                      handleTooltipEditClick
                    }
                    handleTooltipDeleteClick={
                      handleTooltipDeleteClick
                    }
                    tooltips={tooltips}
                    tooltipDeleteLoading={
                      tooltipDeleteLoading
                    }
                  />
                ),
              )}
            </>
          )}
      </article>

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
                {t("form-page:modal:title")}
              </h2>

              <form
                method="PUT"
                onSubmit={handleEditSubmit}
              >
                <FormInput
                  icon={<IconFont />}
                  id="name"
                  handleChange={(e) =>
                    Form.handleChange(
                      e,
                      "name",
                      setContentForm,
                      contentForm,
                    )
                  }
                  value={contentForm.name}
                  ariaDescribedby={t(
                    "form-page:input:formName:ariaDescribedby",
                  )}
                  title={t(
                    "form:input:formName:title",
                  )}
                  mb
                  maxLength={60}
                  type="text"
                />

                <FormSelect
                  icon={<IconTimezone />}
                  id="timezone"
                  defaultTitle={t(
                    "form:input:timezone:title",
                  )}
                  ariaDescribedby={t(
                    "form-page:input:timezone:ariaDescribedby",
                  )}
                  options={timezone}
                  handleChange={(e) =>
                    Form.handleChange(
                      e,
                      "timezone",
                      setContentForm,
                      contentForm,
                    )
                  }
                  value={contentForm.timezone}
                />

                <BtnLoader
                  loading={editLoading}
                  text={t(
                    "form-page:modal:btn:edit",
                  )}
                  disabled={
                    items[editIndex].name ===
                      contentForm.name &&
                    items[editIndex].timezone ===
                      contentForm.timezone
                  }
                />
              </form>
            </>
          ) : (
            <></>
          )
        }
      />
    </Wrapper>
  );
};

export default CardPage;
