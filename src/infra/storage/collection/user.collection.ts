import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";
import {timestampsPlugin} from "@/src/infra/mongo/plugin/timestamps.plugin";

export type UserDocument = HydratedDocument<UserCollection>

@Schema({collection: 'user'})
export class UserCollection {

  @Prop()
  _id: string;

  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(UserCollection)
