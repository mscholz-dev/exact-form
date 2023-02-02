import {
  ChangeEvent,
  ReactNode,
  Ref,
} from "react";

// types
import { TCookie } from "./type";

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
