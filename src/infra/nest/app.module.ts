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
import {auditingPlugin} from "@/src/infra/mongo/plugin/auditing.plugin";

const CommandHandlers = [CreateUserHandler, LoginHandler];
const QueryHandlers = [GetUserByIdHandler]
const Controllers = [UserController, AuthController]
const MongoDBConfiguration = [
  MongooseModule.forRoot(
    'mongodb://localhost:27017', {
      connectionFactory: (connection) => {
        connection.plugin(timestampsPlugin);
        connection.plugin(auditingPlugin);

        return connection;
      }
    }),
  MongooseModule.forFeature([{name: UserCollection.name, schema: UserSchema}])
]
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
    ...MongoDBConfiguration,
    ...JwtConfiguration,
    MongooseModule.forFeatureAsync([
      {
        name: UserCollection.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', function () {
            console.log('Hello from pre save');
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [...Controllers],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...Repositories,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ]
})
export class AppModule {
}
