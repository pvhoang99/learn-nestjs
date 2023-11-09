import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {Body, Controller, Get, Inject, Param, Post, UseGuards} from "@nestjs/common";
import {plainToInstance} from 'class-transformer';
import {CreateUserCommand} from "@/src/app/command/create-user.command";
import {CommandResult, CreateUserRequest, GetUserByIdResponse} from "@/src/api/dtos";
import {GetUserByIdQuery} from "@/src/app/query/get-user-by-id.query";
import {AuthGuard, Public} from "@/src/infra/security/auth.guard";
import {RequestContext} from "@/src/infra/security/request-context";

@Controller("/users")
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get(':id')
  public async getUser(@Param('id') id: string): Promise<GetUserByIdResponse> {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }

  @Post()
  public async createUser(@Body() req: CreateUserRequest): Promise<CommandResult> {
    const id: string = await this.commandBus.execute(plainToInstance(CreateUserCommand, req));

    return CommandResult.of(id);
  }

}
