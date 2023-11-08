import {AggregateRoot} from "@nestjs/cqrs";
import {CreateUserDTO} from "./dtos";
import {v4 as uuid} from 'uuid';

export class User extends AggregateRoot {
  private id: string;
  private name: string;

  public static createUser(data: CreateUserDTO): User {
    const user: User = new User();
    user.setId(uuid.toString())
    user.setName(data.name)

    return user;
  }

  public getId(): string {
    return this.name;
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
