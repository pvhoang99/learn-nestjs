import {Body, Controller, Post} from "@nestjs/common";
import {LoginRequest, LoginResponse} from "@/src/api/dtos";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {LoginCommand} from "@/src/app/command/login.command";
import {Public} from "@/src/infra/security/auth.guard";

@Controller("/auth")
export class AuthController {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {
  }

  @Public()
  @Post("/login")
  public async login(@Body() req: LoginRequest): Promise<LoginResponse> {
    return await this.commandBus.execute(plainToInstance(LoginCommand, req));
  }

}