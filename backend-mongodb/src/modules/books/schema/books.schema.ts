import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { mongooseAggregatePaginate } from 'src/common/helper/helper';
import { USERS_MODEL } from 'src/modules/users/schema/users.schema';

const BOOKS_MODEL = 'books';
const BooksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: USERS_MODEL, // Reference to the User model
      required: true,
    },
  },
  { timestamps: true },
);

BooksSchema.plugin(mongoosePaginate);
BooksSchema.plugin(mongooseAggregatePaginate);

export { BOOKS_MODEL, BooksSchema };
