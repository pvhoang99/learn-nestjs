import {Schema} from 'mongoose';
import {RequestContext} from "nestjs-request-context";

export function auditingPlugin(schema: Schema) {
  schema.add({
    createdBy: {
      type: Schema.Types.String,
      default: 'anonymous'
    },
    updatedBy: {
      type: Schema.Types.String,
      default: 'anonymous'
    },
  });

  schema.pre('save', function (next) {
    const req: Request = RequestContext.currentContext.req;
    const username: string = req['currentUser']['username'];
    if (username) {
      this.updatedBy = username;
      if (!this.createdBy || this.createdBy === 'anonymous') {
        this.createdBy = username;
      }
    }

    next();
  });
}
