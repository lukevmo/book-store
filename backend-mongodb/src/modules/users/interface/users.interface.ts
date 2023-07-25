import { Document } from 'mongoose';

export interface IUsers {
  _id: object;
  email: string;
  fullName: string;
  password?: string;
  salt: string;
}

export type IUsersDoc = Document & IUsers;
