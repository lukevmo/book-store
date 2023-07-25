import { IBookData } from './book.type';

export interface API_Response {
  totalElements: number;
  data: IBookData[];
  totalPage: number;
  currentPage: number;
}

export interface API_Params {
  page?: number;
  pageSize?: number;
  search?: string;
}
