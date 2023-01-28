export type TSignupForm = {
  username: string;
  email: string;
  password: string;
  password2: string;
  locale: string;
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
  email: string;
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
};
