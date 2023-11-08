import {CommandHandler, ICommand, ICommandHandler} from "@nestjs/cqrs";
import {User} from "../../domain/user/user";
import {UserRepository} from "../../domain/user/user.repository";
import {Inject} from "@nestjs/common";
import {CreateUserRequest} from "../../api/dtos";

export class CreateUserCommand implements ICommand, CreateUserRequest {
  name: string;
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
