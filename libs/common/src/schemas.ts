import { EAppointmentStatus, ERole } from "./enums";

export interface IUser {
    id?: string;
    email: string;
    password?: string;
    phoneNumber: string;
    username: string;
    fullname?: string;
    role: ERole;
    doctorId?: string;
    doctor?: IDoctor;
    secretaryId?: string;
    secretary?: ISecretary;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IDoctor {
    id?: string;
    speciality: string;
    userId?: string;
    user?: IUser;
    secretaryId?: string;
    secretaries?: ISecretary[];
    thumbnail?: string;
    locationAddress?: string;
    bio?: string;
    description?: string;
    appointments?: IAppointment[];
    billings?: IBilling[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ISecretary {
    id?: string;
    doctorId?: string;
    doctor?: IDoctor;
    userId?: string;
    user?: IUser;
    bio?: string;
    thumbnail?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IClient {
    id?: string;
    email?: string;
    phoneNumber?: string;
    medicalHistories?: IMedicalHistory[];
    appointments?: IAppointment[];
    billings?: IBilling[];
    thumbnail?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IAppointment {
    id?: string;
    clientId?: string;
    client?: IClient;
    doctorId?: string;
    doctor?: IDoctor;
    date: Date;
    status: EAppointmentStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IBilling {
    id?: string;
    clientId?: string;
    client?: IClient;
    doctorId?: string;
    doctor?: IDoctor;
    ammount: number;
    dueDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IMedicalHistory {
    id?: string;
    clientId?: string;
    client?: IClient;
    appointment: Date;
    description: string;
    documents?: string[]
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IEfile {
    id?: string;
    file_title: string;
    file_type: string;
    file_name: string;
    original_name: string;
    file_size: number;
    url: string;
    createdAt?: Date;
    updatedAt?: Date;
}