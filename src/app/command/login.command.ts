import {CommandHandler, ICommand, ICommandHandler} from "@nestjs/cqrs";
import {LoginRequest, LoginResponse} from "@/src/api/dtos";
import {Inject, UnauthorizedException} from "@nestjs/common";
import {UserReadRepository} from "@/src/app/repo/user.read-repo";
import {UserCollection} from "@/src/infra/storage/collection/user.collection";
import {JwtService} from "@nestjs/jwt";

export class LoginCommand implements ICommand, LoginRequest {
  public readonly password: string;
  public readonly username: string;
}

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand, LoginResponse> {
  public constructor(
    @Inject("UserReadRepository")
    private readonly userReadRepository: UserReadRepository,
    private readonly jwtService: JwtService
  ) {
  }

  public async execute(command: LoginCommand): Promise<LoginResponse> {
    const user: UserCollection = await this.userReadRepository.getUserByUsername(command.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const password: string = user.password;

    if (command.password !== password) {
      throw new UnauthorizedException();
    }

    const payload: any = {sub: user._id, username: user.username};

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

}