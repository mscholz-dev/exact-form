export type TSignupForm = {
  username: string;
  email: string;
  password: string;
  password2: string;
  market: boolean;
  locale: string;
};

export type TInspectData = Record<string, any>;

export type TInspectDataErrors = {
  key: string;
  message: string;
}[];

export type THeaderData = {
  id: number;
  title: string;
  url: string;
  avatar: string;
}[];

export type TSigninForm = {
  email: string;
  password: string;
  locale: string;
};

export type TContactForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  locale: string;
};

export type TCypressFormData = {
  cyData: string;
  value: string;
}[];

export type TCypressFormError = {
  id: number;
  toastValue: string;
}[];

export type TLocale = {
  locale: string;
};

export type TCookie = {
  email: string;
  username: string;
  role: "" | "CLIENT" | "ADMIN" | "SUPER_ADMIN";
};

export type TProfileForm = {
  username: string;
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
  market: boolean;
};

export type TChangeEmailForm = {
  newEmail: string;
  newEmail2: string;
  token: string | undefined;
  locale: string;
};

export type TRole =
  | ""
  | "CLIENT"
  | "ADMIN"
  | "SUPER_ADMIN";

export type TCardForm = {
  name: string;
  key: string;
  timezone: {
    name: string;
    offset: number;
  };
  items: number;
  owner: string;
};

export type TPagingArray = {
  id: number;
  number: number;
  current: boolean;
};

export type TFormCreationForm = {
  name: string;
  timezone: string;
  locale: string;
};
