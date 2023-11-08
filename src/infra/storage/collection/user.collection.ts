import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type UserDocument = HydratedDocument<UserCollection>

@Schema({collection: 'user'})
export class UserCollection {

  @Prop()
  _id: string;

  @Prop()
  name: string;

}

export const UserSchema = SchemaFactory.createForClass(UserCollection)