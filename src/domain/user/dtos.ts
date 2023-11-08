export type User = {
  id: string,
  name: string
}

export type CreateUserDTO = Omit<User, 'id'>
