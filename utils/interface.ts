import {
  ChangeEvent,
  ReactNode,
  Ref,
} from "react";

// types
import { TCookie } from "./type";

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
}

export interface IPage {
  title: string;
  children: ReactNode;
  className?: string;
  description: string;
  padding?: boolean;
  cookie: TCookie;
}

export interface IHeader {
  myRef: Ref<HTMLHeadingElement>;
  cookie: TCookie;
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
