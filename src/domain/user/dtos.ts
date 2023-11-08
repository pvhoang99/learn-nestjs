export type User = {
  id: string,
  name: string
  username: string,
  password: string,
}

export type CreateUserDTO = Omit<User, 'id'>

export type UserVm = Omit<User, 'password'>
