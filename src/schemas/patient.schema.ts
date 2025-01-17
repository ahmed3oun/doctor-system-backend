import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ versionKey: false })
export class Patient extends AbstractDocument {
    @Prop()
    email?: string;

    @Prop()
    thumbnail?: string;

    @Prop({ unique: true, type: String, ref: 'MedicalInformation'})
    medical_information?: string;

    @Prop({ type: [Types.ObjectId], ref: 'Billing' })
    billings_ids?: string[];

    @Prop({ type: [Types.ObjectId], ref: 'Appointment' })
    appointments_ids?: string[]

    @Prop({ type: [Types.ObjectId], ref: 'MedicalHistory' })
    medical_histories_ids?: string[]

    @Prop({ unique: true, type: String, ref: 'User' })
    user_id: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);