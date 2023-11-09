import {InjectModel} from "@nestjs/mongoose";
import {Injectable, NotFoundException} from "@nestjs/common";
import {Model} from "mongoose";
import {UserReadRepository} from "@/src/app/repo/user.read-repo";
import {UserCollection, UserDocument} from "@/src/infra/storage/collection/user.collection";
import {User} from "@/src/domain/user/user";
import {UserRepository} from "@/src/domain/user/user.repository";
import {UserStorageMapper} from "@/src/infra/storage/mapper/user.storage-mapper";
import {UserVm} from "@/src/domain/user/dtos";

@Injectable()
export class MongoUserRepository implements UserRepository, UserReadRepository {

  constructor(
    @InjectModel(UserCollection.name) private readonly userModel: Model<UserDocument>,
  ) {
  }

  public async save(user: User): Promise<void> {
    const userCollection: UserCollection = UserStorageMapper.toUserCollection(user);
    await new this.userModel({...userCollection}).save();
  }

  public async getUserById(id: string): Promise<UserVm> {
    const userCollection: UserCollection = await this.userModel.findById(id).exec();
    if (!userCollection) {
      throw new NotFoundException();
    }

    return UserStorageMapper.toView(userCollection);
  }

  public async getUserByUsername(username: string): Promise<UserCollection> {
    return await this.userModel.findOne(
      {username: username}
    ).exec();
  }

}
