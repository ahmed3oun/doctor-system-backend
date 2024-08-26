import { IUser } from "./schemas";

interface BaseRes {
  message?: string;
  status?: number;
}

export  interface SigninResDTO extends BaseRes {
  user: IUser;
  token: string;
}

export  interface SignupResDTO extends BaseRes {
  user: IUser;
}