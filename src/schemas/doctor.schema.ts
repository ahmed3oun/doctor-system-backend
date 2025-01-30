import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "./user.schema";
import { Appointment } from "./appointment.schema";
import { Billing } from "./billing.schema";
import { Secretary } from "./secretary.schema";

@Schema({ versionKey: false })
export class Doctor extends AbstractDocument {
    @Prop()
    speciality: string;

    @Prop({ unique: true, type: Types.ObjectId, ref: 'User' })
    user: User;

    @Prop()
    location_address?: string;

    @Prop()
    bio?: string;

    @Prop()
    description?: string;

    @Prop([{ type: [Types.ObjectId], ref: 'Appointment' }])
    appointments: Appointment[];

    @Prop([{ type: [Types.ObjectId], ref: 'Billing' }])
    billings: Billing[];

    @Prop([{ type: [Types.ObjectId], ref: 'Secretary' }])
    secretaries: Secretary[];

    @Prop()
    thumbnail?: string;
}



export const DoctorSchema = SchemaFactory.createForClass(Doctor);