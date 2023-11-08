export class CommandResult {
  constructor(private readonly id: string) {
  }

  public static of(id: string): CommandResult {
    return new CommandResult(id)
  }
}

export type CreateUserRequest = {
  name: string,
  username: string,
  password: string,
}

export type GetUserByIdRequest = {
  id: string
}

export type GetUserByIdResponse = {
  id: string,
  name: string,
  username: string,
}

export type LoginRequest = {
  username: string,
  password: string
}

export type LoginResponse = {
  access_token: string,
}