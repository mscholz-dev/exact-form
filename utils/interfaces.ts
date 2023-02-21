import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  Ref,
  SetStateAction,
  SyntheticEvent,
} from "react";

// types
import {
  TCookie,
  TCardForm,
  TTableBox,
} from "./types";

export interface IIndex {
  locale: string;
}

export interface IFormInput {
  icon: JSX.Element;
  id: string;
  handleChange: (
    e: ChangeEvent,
    id: string,
  ) => void;
  value: string;
  ariaDescribedby: string;
  title: string;
  mb?: boolean;
  maxLength: number;
  type: "text" | "email" | "password";
  asterix?: boolean;
  readOnly?: boolean;
  regex?: boolean;
}

export interface IPage {
  title: string;
  children: ReactNode;
  className?: string;
  description: string;
  padding?: boolean;
  cookie: TCookie;
  locale: string;
}

export interface IHeader {
  myRef: Ref<HTMLHeadingElement>;
  cookie: TCookie;
  locale: string;
}

export interface IWrapper {
  children: ReactNode;
  className?: string;
}

export interface IHeaderItem {
  locale: string;
  path: string;
  pathname: string;
  title: string;
  avatar: string;
}

export interface IFormTextarea {
  id: string;
  handleChange: (
    e: ChangeEvent,
    id: string,
  ) => void;
  value: string;
  ariaDescribedby: string;
  title: string;
  maxLength: number;
  asterix?: boolean;
}

export interface IFormPage {
  children: JSX.Element;
  largeForm?: boolean;
  noContainer?: boolean;
}

export interface IFormChangeEmail {
  email: string;
  locale: string;
  token: string | undefined;
}

export interface IAvatar {
  seed: string;
  className?: string;
}

export interface IFormCheckbox {
  id: string;
  handleChange: (
    e: ChangeEvent,
    id: string,
  ) => void;
  value: boolean;
  title?: string;
  ariaDescribedby: string;
  small?: boolean;
}

export interface IBtnLoader {
  loading: boolean;
  text: string;
  disabled?: boolean;
}

export interface IFormProfile {
  username: string;
  email: string;
  role: "" | "CLIENT" | "ADMIN" | "SUPER_ADMIN";
  locale: string;
  market: boolean;
  setUsername: (username: string) => void;
}

export interface IForm {
  locale: string;
}

export interface ICardPage {
  items: TCardForm[];
  locale: string;
  title: string;
  createTitle: string;
  currentPage: number;
  setCurrentPage: Dispatch<
    SetStateAction<number>
  >;
  maxPage: number;
  creationPathname: string;
  countAll: null | number;
  setCountAll: Dispatch<
    SetStateAction<null | number>
  >;
  noDataFoundTitle: string;
  loading: boolean;
  isAuthAndGetAll: (
    startLoading: boolean,
    trash: boolean,
  ) => Promise<void>;
  tooltipBtnCurrentId: number;
  setTooltipBtnCurrentId: Dispatch<
    SetStateAction<number>
  >;
}

export interface ICardForm {
  name: string;
  keyName: string;
  timezone: string;
  items: number;
  owner: string;
  locale: string;
  handleTooltipClick: (
    e: SyntheticEvent,
    index: number,
  ) => void;
  handleTooltipEditClick: (
    e: SyntheticEvent,
    index: number,
  ) => void;
  handleTooltipDeleteClick: (
    e: SyntheticEvent,
    index: number,
  ) => void;
  tooltips: Record<number, boolean>;
  index: number;
  tooltipDeleteLoading: boolean;
  tooltipBtnCurrentId: number;
  handleTooltipRecoverClick: (
    e: React.MouseEvent,
    index: number,
  ) => void;
  recoverLoading: boolean;
}

export interface IFormKey {
  locale: string;
  key: string | undefined;
}

export interface ITable {
  keyName: string;
  items: {
    id: string;
    data: object;
    created_at: Date;
    updated_at: Date;
    user_agent: string;
    referer_url: string;
    geo_localisation: {
      city: string;
      region: string;
      country: string;
    };
  }[];
  title: string;
  countAll: number | null;
  setCountAll: Dispatch<
    SetStateAction<null | number>
  >;
  currentPage: number;
  setCurrentPage: Dispatch<
    SetStateAction<number>
  >;
  maxPage: number;
  noDataFoundTitle: string;
  loading: boolean;
  locale: string;
  timezone: string;
  isAuthAndGetSpecificForm: (
    startLoading: boolean,
    trash: boolean,
  ) => Promise<void>;
  tooltipBtnCurrentId: number;
  setTooltipBtnCurrentId: Dispatch<
    SetStateAction<number>
  >;
}

export interface ITableHeader {
  header: TTableBox;
  handleBooleanChange: () => void;
  selectAll: boolean;
  tooltipBtnCurrentId: number;
}

export interface ITableBody {
  body: TTableBox[];
  selected: Record<string, boolean>;
  setSelected: Dispatch<
    SetStateAction<Record<string, boolean>>
  >;
  locale: string;
  handleTooltipDeleteClick: (
    e: React.MouseEvent,
    index: number,
  ) => void;
  handleTooltipEditClick: (
    e: React.MouseEvent,
    index: number,
  ) => void;
  handleTooltipClick: (index: number) => void;
  tooltips: Record<number, boolean>;
  itemsId: string[];
  tooltipDeleteLoading: boolean;
  tooltipBtnCurrentId: number;
  handleTooltipRecoverClick: (
    e: React.MouseEvent,
    index: number,
  ) => void;
  recoverLoading: boolean;
}

export interface IPaging {
  max: number;
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>;
}

export interface IFormCreation {
  locale: string;
}

export interface IFormSelect {
  id: string;
  defaultTitle: string;
  ariaDescribedby: string;
  icon: JSX.Element;
  options: Array<{
    name: string;
    offset: number;
  }>;
  handleChange: (
    e: ChangeEvent,
    id: string,
  ) => void;
  value: string;
}

export interface INoDataFound {
  title: string;
  largeTXS?: boolean;
}

export interface ITooltipTable {
  index: number;
  open: boolean;
  handleEditClick: (
    e: React.MouseEvent,
    index: number,
  ) => void;
  handleDeleteClick: (
    e: React.MouseEvent,
    index: number,
  ) => void;
  deleteLoading: boolean;
  tooltipBtnCurrentId: number;
  recoverLoading: boolean;
}

export interface IModal {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  content: JSX.Element;
}

export interface ITooltipBtn {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  items: {
    id: number;
    icon: JSX.Element;
    title: string;
    handleClick: (
      e: SyntheticEvent,
      id: number,
      trash: boolean,
    ) => void;
    trash: boolean;
  }[];
  currentId: number;
  loading: boolean;
}
