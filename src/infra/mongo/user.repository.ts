import {UserRepository} from "../../domain/user/user.repository";
import {Injectable} from "@nestjs/common";
import {User} from "../../domain/user/user";

@Injectable()
export class MongoUserRepository implements UserRepository {

  public async save(user: User): Promise<string> {
    console.log(user);

    return Promise.resolve('test');
  }

}
