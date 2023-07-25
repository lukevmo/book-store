import { IPaginationData } from '../interfaces/pagingation.interface';

export const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');

export function paginationTransformer(input): IPaginationData {
  return {
    data: input.docs,
    total: input.totalDocs,
    totalPage: input.totalPages,
    page: input.page,
    limit: input.limit,
  };
}
