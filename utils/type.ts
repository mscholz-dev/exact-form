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
