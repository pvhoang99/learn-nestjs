import {CqrsModule} from "@nestjs/cqrs";
import {Module} from "@nestjs/common";
import {CreateUserHandler} from "../../app/command/create-user.command";
import {UserController} from "../../api/user.controller";
import {MongoUserRepository} from "../mongo/user.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {UserCollection, UserSchema} from "../storage/collection/user.collection";
import {GetUserByIdHandler} from "@/src/app/query/get-user-by-id.query";
import {LoginHandler} from "@/src/app/command/login.command";
import {AuthController} from "@/src/api/auth.controller";
import {JwtModule} from "@nestjs/jwt";
import {AuthGuard} from "@/src/infra/security/auth.guard";
import {APP_GUARD} from "@nestjs/core";
import {timestampsPlugin} from "@/src/infra/mongo/plugin/timestamps.plugin";
import {RequestContextModule} from "nestjs-request-context";
import {auditingPlugin} from "@/src/infra/mongo/plugin/auditing.plugin";
import {UserCreatedHandler} from "@/src/domain/user/event/user-created.event";

const CommandHandlers = [CreateUserHandler, LoginHandler];
const QueryHandlers = [GetUserByIdHandler]
const Controllers = [UserController, AuthController]
const MongoSchemas = [{
  name: UserCollection.name,
  schema: UserSchema,
}]
const EventHandlers = [UserCreatedHandler]

const JwtConfiguration = [JwtModule.register({
  global: true,
  secret: 'test',
  signOptions: {expiresIn: '2 days'},
})]

const Repositories = [
  {
    provide: 'UserRepository',
    useClass: MongoUserRepository
  },
  {
    provide: 'UserReadRepository',
    useClass: MongoUserRepository
  }
]

@Module({
  imports: [
    CqrsModule,
    ...JwtConfiguration,
    RequestContextModule,
    MongooseModule.forRoot(
      'mongodb://localhost:27017', {
        connectionFactory: (connection) => {
          connection.plugin(timestampsPlugin);
          connection.plugin(auditingPlugin);

          return connection;
        }
      }),
    ...MongoSchemas.map(
      (schema) => (MongooseModule.forFeature([{...schema}]))
    )
  ],
  controllers: [...Controllers],
  providers: [
    AuthGuard,
    {
      provide: APP_GUARD,
      useExisting: AuthGuard,
    },
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
    ...Repositories,
  ],
})
export class AppModule {
}
