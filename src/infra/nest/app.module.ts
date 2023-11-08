import {CqrsModule} from "@nestjs/cqrs";
import {Module} from "@nestjs/common";
import {CreateUserHandler} from "../../app/command/create-user.command";
import {UserController} from "../../api/user.controller";
import {MongoUserRepository} from "../mongo/user.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {UserCollection, UserSchema} from "../storage/collection/user.collection";
import {GetUserByIdHandler} from "@/src/app/query/get-user-by-id.query";

export const CommandHandlers = [CreateUserHandler];
export const QueryHandlers = [GetUserByIdHandler]
export const Controllers = [UserController]
export const MongoDBConfiguration = [
  MongooseModule.forRoot('mongodb://localhost:27017'),
  MongooseModule.forFeature([{name: UserCollection.name, schema: UserSchema}])
]

@Module({
  imports: [
    CqrsModule,
    ...MongoDBConfiguration
  ],
  controllers: [...Controllers],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: 'UserRepository',
      useClass: MongoUserRepository
    },
    {
      provide: 'UserReadRepository',
      useClass: MongoUserRepository
    }
  ]
})
export class AppModule {
}
