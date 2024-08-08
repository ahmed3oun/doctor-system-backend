import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class SigninDTO {

    @IsNotEmpty()
    @IsEmail()
    login: string;

    @IsNotEmpty()
    @Length(6, 50)
    password: string;
}