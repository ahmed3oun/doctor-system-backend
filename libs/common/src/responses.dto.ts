import { User } from "./schemas";


export  interface SigninResponse {
  user: User;
  token: string;
  message?: string;
  status?: number
}