import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class Secretary extends AbstractDocument {
    @Prop({ unique: true, type: String, ref: 'Doctor' })
    doctor_id: string;

    @Prop({ unique: true, type: String, ref: 'User' })
    user_id: string;

    @Prop()
    bio?: string;

    @Prop()
    thumbnail?: string;
}

export const SecretarySchema = SchemaFactory.createForClass(Secretary);