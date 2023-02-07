import {
  ChangeEvent,
  ReactNode,
  Ref,
} from "react";

// types
import { TCookie, TCardForm } from "./type";

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
  title: string;
  ariaDescribedby: string;
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
}

export interface ICardForm {
  name: string;
  keyName: string;
  timezone: {
    name: string;
    offset: number;
  };
  items: number;
  owner: string;
  locale: string;
}

export interface ICardFormPreset {
  pathname: string;
  locale: string;
  title: string;
}

export interface IFormKey {
  locale: string;
}

export interface ITable {
  data: object[];
}

export interface ITableHeader {
  header: string[];
}
