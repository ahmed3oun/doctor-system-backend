import { AbstractDocument, EBillingStatus } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ versionKey: false })
export class Billing extends AbstractDocument {
    @Prop({ type: Types.ObjectId, ref: 'Doctor' })
    doctor_id: string;

    @Prop({ type: Types.ObjectId, ref: 'Patient' })
    patient_id: string;

    @Prop({ default: 0 })
    ammount: number;

    @Prop()
    due_date: Date;

    @Prop({ enum: ["PAID", "PARTIALLY_PAID", "OVERDUE", "REFUNDED", "CANCELED"] })
    status: string;
}

export const BillingSchema = SchemaFactory.createForClass(Billing);