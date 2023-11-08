import {AggregateRoot} from "@nestjs/cqrs";
import {v4 as uuid} from 'uuid';
import {CreateUserDTO} from "@/src/domain/user/dtos";

export class User extends AggregateRoot {
  private id: string;
  private name: string;

  public static createUser(data: CreateUserDTO): User {
    const user: User = new User();
    user.setId(uuid())
    user.setName(data.name)

    return user;
  }

  public getId(): string {
    return this.id;
  }

  private setId(id: string): void {
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  private setName(value: string) {
    this.name = value;
  }
}
