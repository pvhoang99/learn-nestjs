import {UserCollection} from "../collection/user.collection";
import {User} from "@/src/domain/user/user";
import {UserVm} from "@/src/domain/user/dtos";

export class UserStorageMapper {

  private constructor() {
  }

  public static toUserCollection(user: User): UserCollection {
    return {
      _id: user.getId(),
      name: user.getName(),
      username: user.getUsername(),
      password: user.getPassword()
    };
  }

  public static toView(userCollection: UserCollection): UserVm {
    return {
      id: userCollection._id,
      name: userCollection.name,
      username: userCollection.username
    }
  }

}