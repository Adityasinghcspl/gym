import { JwtPayload } from "jwt-decode";

export const roles = {
  ADMIN: 'admin',
  TRAINER: 'trainer',
  USER: 'user'
} as const;

export type Role = keyof typeof roles;

export type SignUpTrainerForm = {
  name: string;
  email: string;
  phone_no: number;
  bio?: string;
  password: string;
  retype_password?: string;
};

export type ResetPasswordForm = {
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
  address?: string;
  password: string;
  retype_password: string;
};

export type SignInUserForm = {
  email: string;
  password: string;
};

export type AccessToken = {
  accessToken: string;
}

export interface trainer {
  _id: string;
  name: string;
  email: string;
  phone_no: string;
  bio?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone_no: string;
  address?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Membership {
  _id?: string;
  type: "Monthly" | "Quarterly" | "Half-Yearly" | "Yearly";
  price: number;
  durationInMonths: number;
  features: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Define a custom interface for the expected token structure
export interface CustomJwtPayload extends JwtPayload {
  name: string;
  email: string;
  id: string;
  role: string;
}

export interface Attendance {
  _id?: string;
  userId: string;
  date?: string; // ISO string (auto from backend)
  checkIn?: string; // ISO string
  checkOut?: string; // ISO string
  createdAt?: string;
  updatedAt?: string;
}

export interface AttendanceListState {
  data: Attendance[] | null;
  loading: boolean;
  error: string | null;
}

export interface AttendanceItemState {
  data: Attendance | null;
  loading: boolean;
  error: string | null;
}

export interface AttendanceState {
  attendanceList: AttendanceListState;
  attendance: AttendanceItemState;
}