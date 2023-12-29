import {RequestContext} from "nestjs-request-context";
import {Request} from 'express';

export class SecurityContext {
  private constructor() {
  }

  public static getCurrentUser(): string {
    const req: Request = RequestContext.currentContext.req;
    return req['currentUser']?.username ?? 'anonymous';
  }

  public static setUserInfo(request: Request, currentUser: any) {
    request['currentUser'] = currentUser;
  }

}