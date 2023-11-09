import {Schema} from 'mongoose';
import {SecurityContext} from "@/src/infra/security/securityContext";

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
    const username: string = SecurityContext.getCurrentUser();
    if (username) {
      this.updatedBy = username;
      if (!this.createdBy || this.createdBy === 'anonymous') {
        this.createdBy = username;
      }
    }

    next();
  });
}
