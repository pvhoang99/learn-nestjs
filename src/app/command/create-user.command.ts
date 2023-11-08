import {CommandHandler, ICommand, ICommandHandler} from "@nestjs/cqrs";
import {Inject} from "@nestjs/common";
import {CreateUserRequest} from "@/src/api/dtos";
import {UserRepository} from "@/src/domain/user/user.repository";
import {User} from "@/src/domain/user/user";

export class CreateUserCommand implements ICommand, CreateUserRequest {
  name: string;
  username: string;
  password: string;
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, string> {
  constructor(
    @Inject("UserRepository")
    private readonly userRepository: UserRepository
  ) {
  }

  public async execute(command: CreateUserCommand): Promise<string> {
    const user: User = User.createUser(command);
    await this.userRepository.save(user);

    return user.getId();
  }
}
