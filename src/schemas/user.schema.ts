import { AbstractDocument, ERole } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Doctor } from "./doctor.schema";
import { Types } from "mongoose";
import { Secretary } from "./secretary.schema";

@Schema({ versionKey: false })
export class User extends AbstractDocument {
    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop({ default: '00-000-000' })
    phone_number: string;

    @Prop({ unique: true })
    username: string;

    @Prop()
    fullname?: string;

    @Prop({ enum: ["DOCTOR", "PATIENT", "SECRETARY", "ADMIN"] })
    role: /* "DOCTOR" | "PATIENT" | "SECRETARY" | "ADMIN" */ERole;

    @Prop({ type: Types.ObjectId, ref: 'Doctor' })
    doctor?: Doctor;

    @Prop({ type: Types.ObjectId, ref: 'Secretary' })
    secretary?: Secretary;

    @Prop({ type: Types.ObjectId, ref: 'Patient' })
    patient?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
