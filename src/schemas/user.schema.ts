import { AbstractDocument, ERole } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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
    role: ERole;

    @Prop({ unique: true, type: String, ref: 'Doctor' })
    doctor_id?: string;

    @Prop({ unique: true, type: String, ref: 'Secretary' })
    secretary_id?: string;

    @Prop({ unique: true, type: String, ref: 'Patient' })
    patient_id?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
