export type User = {
  name: string
}

export type CreateUserDTO = Omit<User, ''>
