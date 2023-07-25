export interface createdByAuthor {
  createdAt: string;
  email: string;
  fullName: string;
  updatedAt: string;
}
export interface IBookData {
  _id?: any | null;
  title: string;
  author: string;
  publicationYear: Number;
  genre: string;
  description?: string;
  createdBy?: createdByAuthor;
}
export interface IBookDataTable {
  _id?: any | null;
  title: string;
  author: string;
  publicationYear: Number;
  genre: string;
  description?: string;
  createdBy?: string;
}

export interface ICreateBookData {
  title: string;
  author: string;
  publicationYear: Number;
  genre: string;
  description?: string;
}
