export type SignUpTrainerForm = {
  name: string;
  email: string;
  phone_no: number;
  password: string;
  retype_password: string;
};

export type SignInTrainerForm = {
  email: string;
  password: string;
};

export type SignUpUserForm = {
  name: string;
  email: string;
  phone_no: number;
  password: string;
  retype_password: string;
};

export type SignInUserForm = {
  email: string;
  password: string;
};


export type AccessToken ={
  accessToken: string;
}