import { AppointmentStatus, Role } from "./constants";

export interface User {
    id?: string;
    email: string;
    phoneNumber: string;
    username: string;
    fullname?: string;
    role: Role;
    doctorId?: string;
    doctor?: Doctor;
    secretaryId?: string;
    secretary?: Secretary;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Doctor {
    id?: string;
    speciality: string;
    userId?: string;
    user?: User;
    secretaryId?: string;
    secretary?: Secretary;
    locationAddress?: string;
    bio?: string;
    description?: string;
    appointments?: Appointment[];
    billings?: Billing[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Secretary {
    id?: string;
    doctorId?: string;
    doctor?: Doctor;
    userId?: string;
    user?: User;
    bio?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Client {
    id?: string;
    email?: string;
    phoneNumber?: string;
    medicalHistories?: MedicalHistory[];
    appointments?: Appointment[];
    billings?: Billing[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Appointment {
    id?: string;
    clientId?: string;
    client?: Client;
    doctorId?: string;
    doctor?: Doctor;
    date: Date;
    status: AppointmentStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Billing {
    id?: string;
    clientId?: string;
    client?: Client;
    doctorId?: string;
    doctor?: Doctor;
    ammount: number;
    dueDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface MedicalHistory {
    id?: string;
    clientId?: string;
    client?: Client;
    appointment: Date;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}
