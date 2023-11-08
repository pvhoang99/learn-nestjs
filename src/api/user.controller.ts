import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {Body, Controller, Post} from "@nestjs/common";
import {CreateUserCommand} from "../app/command/create-user.command";
import {CreateUserRequest} from "./dtos";
import {plainToInstance} from 'class-transformer';

@Controller("/users")
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {
  }

  @Post()
  public async createUser(@Body() req: CreateUserRequest): Promise<string> {
    return await this.commandBus.execute(plainToInstance(CreateUserCommand, req));
  }
}
