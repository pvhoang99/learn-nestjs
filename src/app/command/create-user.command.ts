import {CommandHandler, EventPublisher, ICommand, ICommandHandler} from "@nestjs/cqrs";
import {BadRequestException, Inject} from "@nestjs/common";
import {CreateUserRequest} from "@/src/api/dtos";
import {UserRepository} from "@/src/domain/user/user.repository";
import {User} from "@/src/domain/user/user";
import { object, string, number, date, InferType } from 'yup';

export class CreateUserCommand implements ICommand, CreateUserRequest {
  name: string;
  username: string;
  password: string;
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, string> {
  constructor(
    @Inject("UserRepository")
    private readonly userRepository: UserRepository,
    private publisher: EventPublisher,
  ) {
  }

  public async execute(command: CreateUserCommand): Promise<string> {
    const user: User = this.publisher.mergeObjectContext(
      User.createUser(command)
    );
    let userSchema = object({
      name: string().required(),
      age: number().required().positive().integer(),
      email: string().email(),
      website: string().url().nullable(),
      createdOn: date().default(() => new Date()),
    });
    const parsedUser =  userSchema.validateSync(
      {
        name: 'jimmy',
        age: '24',
      },
      { strict: true },
    );
    await this.userRepository.save(user);
    user.commit();

    return user.getId();
  }
}
