import {User as UserVm} from "@/src/domain/user/dtos";

export interface UserReadRepository {
  getUserById(id: string): Promise<UserVm>
}