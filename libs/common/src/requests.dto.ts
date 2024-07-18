import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class LoginDTO {

    @IsNotEmpty()
    @IsEmail()
    login: string;

    @IsNotEmpty()
    @Length(6, 50)
    password: string;
}