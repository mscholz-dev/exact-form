export type TSignupForm = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

export type TInspectData = {
  username?: string;
  email?: string;
  password?: string;
  password2?: string;
};

export type TInspectDataErrors = {
  key: string;
  message: string;
}[];

export type THeaderData = {
  id: number;
  title: string;
  url: string;
}[];

export type TSigninForm = {
  email: string;
  password: string;
};

export type TContactForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

export type TCypressFormData = {
  cyData: string;
  value: string;
}[];

export type TCypressFormError = {
  id: number;
  toastValue: string;
}[];
