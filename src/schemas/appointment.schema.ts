import { AbstractDocument, EAppointmentStatus } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ versionKey: false })
export class Appointment extends AbstractDocument {
    @Prop({ type: Types.ObjectId, ref: 'Patient' })
    patient_id: string;

    @Prop({ type: Types.ObjectId, ref: 'Doctor' })
    doctor_id: string;

    @Prop()
    date: Date;

    @Prop({ enum: ["PENDING", "FULLFILLED", "DONE", "CANCELED"] })
    status: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);