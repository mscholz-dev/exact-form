import {
  ChangeEvent,
  Dispatch,
  ReactNode,
  Ref,
  SetStateAction,
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
  url: string;
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
  noDataFoundTitle: string;
  loading: boolean;
}

export interface ICardForm {
  name: string;
  keyName: string;
  timezone: string;
  items: number;
  owner: string;
  locale: string;
}

export interface IFormKey {
  locale: string;
}

export interface ITable {
  items: {
    data: object;
    created_at: Date;
  }[];
  title: string;
  countAll: number | null;
  currentPage: number;
  setCurrentPage: Dispatch<
    SetStateAction<number>
  >;
  maxPage: number;
  noDataFoundTitle: string;
  loading: boolean;
  locale: string;
  timezone: string;
}

export interface ITableHeader {
  header: TTableBox;
  handleBooleanChange: () => void;
  selectAll: boolean;
}

export interface ITableBody {
  body: TTableBox[];
  selected: Record<string, boolean>;
  setSelected: Dispatch<
    SetStateAction<Record<string, boolean>>
  >;
  locale: string;
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
