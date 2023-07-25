import { Document, Types } from 'mongoose';

export interface IBooks {
  title: string;
  author: string;
  publicationYear: number;
  genre: string;
  description: string;
  createdBy: Types.ObjectId;
}

export type IBooksDoc = Document & IBooks;
