import {Schema} from 'mongoose';

export function auditingPlugin(schema: Schema) {
  schema.add({
    createdBy: {
      type: Schema.Types.String

    },
    updatedBy: {
      type: Schema.Types.String
    },
  });

  schema.pre('save', function (next) {
    const currentUser = this._doc?.currentUser;
    if (currentUser) {
      this.updatedBy = currentUser._id;
      if (!this.createdBy) {
        this.createdBy = currentUser._id;
      }
    }

    next();
  });
}