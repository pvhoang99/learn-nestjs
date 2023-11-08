import {UserCollection} from "../collection/user.collection";
import {User} from "@/src/domain/user/user";
import {User as UserVm} from "@/src/domain/user/dtos"

export class UserStorageMapper {

  public static toUserCollection(user: User): UserCollection {
    return {
      _id: user.getId(),
      name: user.getName()
    };
  }

  public static toView(userCollection: UserCollection): UserVm {
    return {
      id: userCollection._id,
      name: userCollection.name
    }
  }

}