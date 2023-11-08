import {UserCollection} from "@/src/infra/storage/collection/user.collection";
import {UserVm} from "@/src/domain/user/dtos";

export interface UserReadRepository {
  getUserById(id: string): Promise<UserVm>

  getUserByUsername(username: string): Promise<UserCollection>
}