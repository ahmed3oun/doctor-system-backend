import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, Length } from "class-validator";
import { ERole } from "./enums";
import { Doctor, Patient, Secretary } from "@src/schemas";

/***
 *  Auth Module
 */
export class SigninReqDTO {
    @IsNotEmpty()
    @IsEmail()
    login: string;

    @IsNotEmpty()
    @Length(6, 50)
    password: string;
}

export class SignupReqDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6, 50)
    password: string;

    @IsPhoneNumber('TN')
    phoneNumber: string;

    @IsNotEmpty()
    username: string;

    @IsOptional()
    fullname?: string;

    @IsNotEmpty()
    role: ERole;
}

export class ConfirmReqDTO {
    @IsNotEmpty()
    token: string;
}

/***
 *  User Module
 */
export class UpdateUserReqDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsPhoneNumber('TN')
    phoneNumber: string;

    @IsNotEmpty()
    username: string;

    @IsOptional()
    fullname?: string;

    doctor?: Doctor

    secretary?: Secretary;

    patient?: Patient;
}

export class UpdatePasswordReqDTO {

    @IsNotEmpty()
    @Length(6, 50)
    oldPassword: string;

    @IsNotEmpty()
    @Length(6, 50)
    newPassword: string;

    @IsNotEmpty()
    @Length(6, 50)
    confirmPassword: string;
}