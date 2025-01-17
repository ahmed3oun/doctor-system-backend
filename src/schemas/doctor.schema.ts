import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ versionKey: false })
export class Doctor extends AbstractDocument {
    @Prop()
    speciality: string;

    @Prop({ unique: true, type: String, ref: 'User' })
    user_id: string;

    @Prop([{ type: [Types.ObjectId], ref: 'Appointment' }])
    appointments_ids: string[];

    @Prop([{ type: [Types.ObjectId], ref: 'Billing' }])
    billings_ids: string[];

    @Prop()
    location_address?: string;

    @Prop()
    bio?: string;

    @Prop()
    description?: string;

    @Prop([{ type: [Types.ObjectId], ref: 'Secretary' }])
    secretaries_ids: string[];

    @Prop()
    thumbnail?: string;
}



export const DoctorSchema = SchemaFactory.createForClass(Doctor);