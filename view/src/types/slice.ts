import { AccessToken, Membership, trainer, User } from "./type";

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
    data: string | null;
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

export interface MembershipState {
  membershipsList: {
    data: Membership[] | null;
    loading: boolean;
    error: string | null;
  };
  membership: {
    data: Membership | null;
    loading: boolean;
    error: string | null;
  };
}
