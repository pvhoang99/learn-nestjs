import {AggregateRoot} from "@nestjs/cqrs";
import {v4 as uuid} from 'uuid';
import {CreateUserDTO} from "@/src/domain/user/dtos";

export class User extends AggregateRoot {
  private id: string;
  private name: string;
  private username: string;
  private password: string;

  public static createUser(data: CreateUserDTO): User {
    const user: User = new User();
    user.setId(uuid())
    user.setName(data.name)
    user.setUsername(data.username)
    user.setPassword(data.password)

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

  public getUsername(): string {
    return this.username;
  }

  private setUsername(value: string) {
    this.username = value;
  }

  public getPassword(): string {
    return this.password;
  }

  private setPassword(value: string) {
    this.password = value;
  }

}
