import { AccessToken, SignUpTrainerForm, SignUpUserForm } from "./type";

export interface authState {
  signUpTrainer: {
    data: SignUpTrainerForm | null;
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