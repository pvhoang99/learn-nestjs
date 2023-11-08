import {Schema} from 'mongoose';

export function timestampsPlugin(schema: Schema) {
  schema.add({
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });

  schema.pre('save', function (next) {
    const now = new Date();
    this.updatedAt = now;

    if (!this.createdAt) {
      this.createdAt = now;
    }

    next();
  });
}