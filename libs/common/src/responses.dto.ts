import { IUser } from "@app/common";

interface IBaseRes {
  message?: string;
  status?: number;
}

/***
 *  Auth Module
 */
export  interface SigninResDTO extends IBaseRes {
  user: IUser;
  token: string;
}

export  interface SignupResDTO extends IBaseRes {
  user: IUser;
}