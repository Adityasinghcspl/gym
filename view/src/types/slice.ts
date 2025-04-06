import { AccessToken, SignUpUserForm, trainer, User } from "./type";

export interface authState {
  signUpTrainer: {
    data: string | null;
    loading: boolean;
    error: any | null;
  };
  signInTrainer: {
    data: AccessToken | null;
    loading: boolean;
    error: any | null;
  };
  signUpUser: {
    data: SignUpUserForm | null;
    loading: boolean;
    error: any | null;
  };
  signInUser: {
    data: AccessToken | null;
    loading: boolean;
    error: any | null;
  };
}

export interface trainerState {
  trainersList: {
    data: trainer[] | null;
    loading: boolean;
    error: any | null;
  };
  trainer: {
    data: trainer | null;
    loading: boolean;
    error: any | null;
  };
}

export interface UserState {
  userList: {
    data: User[] | null;
    loading: boolean;
    error: any | null;
  };
  user: {
    data: User | null;
    loading: boolean;
    error: any | null;
  };
}