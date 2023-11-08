import {CqrsModule} from "@nestjs/cqrs";
import {Module} from "@nestjs/common";
import {CreateUserHandler} from "../../app/command/create-user.command";
import {UserController} from "../../api/user.controller";
import {MongoUserRepository} from "../mongo/user.repository";

export const CommandHandlers = [CreateUserHandler];
export const Controllers = [UserController]

@Module({
  imports: [CqrsModule],
  controllers: [...Controllers],
  providers: [
    ...CommandHandlers,
    {
      provide: 'UserRepository',
      useClass: MongoUserRepository
    }
  ]
})
export class AppModule {
}
