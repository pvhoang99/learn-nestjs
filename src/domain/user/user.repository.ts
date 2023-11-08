import {User} from "@/src/domain/user/user";

export interface UserRepository {
  save(user: User): Promise<void>
}
