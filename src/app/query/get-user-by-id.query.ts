import {IQuery, IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetUserByIdRequest, GetUserByIdResponse} from "@/src/api/dtos";
import {Inject} from "@nestjs/common";
import {UserReadRepository} from "@/src/app/repo/user.read-repo";

export class GetUserByIdQuery implements IQuery, GetUserByIdRequest {
  constructor(public readonly id: string) {
  }
}

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery, GetUserByIdResponse> {

  public constructor(
    @Inject("UserReadRepository")
    private readonly userReadRepository: UserReadRepository
  ) {
  }

  public async execute(query: GetUserByIdQuery): Promise<GetUserByIdResponse> {
    return this.userReadRepository.getUserById(query.id);
  }

}