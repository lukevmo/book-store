import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { mongooseAggregatePaginate } from 'src/common/helper/helper';

const USERS_MODEL = 'users';
const UsersSchema = new mongoose.Schema(
  {
    email: {
      require: true,
      type: String,
      default: '',
    },

    fullName: {
      require: true,
      type: String,
      default: '',
    },

    password: {
      require: true,
      type: String,
      default: '',
    },

    salt: {
      require: true,
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);
UsersSchema.plugin(mongoosePaginate);
UsersSchema.plugin(mongooseAggregatePaginate);

export { USERS_MODEL, UsersSchema };
