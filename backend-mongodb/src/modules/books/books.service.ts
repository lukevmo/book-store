import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PaginateModel,
  Document,
  AggregatePaginateModel,
  Types,
  PipelineStage,
} from 'mongoose';

// import { PaginateModel } from 'mongoose-paginate-v2';
import { CreateBooksDto } from './dto/create-books.dto';
import { UpdateBooksDto } from './dto/update-books.dto';
import { BOOKS_MODEL } from './schema/books.schema';
import { IBooksDoc } from './interface/books.interface';
import IJwtPayload from '../auth/payloads/jwt-payload';
import { UsersService } from '../users/users.service';
import { GetBooksDto } from './dto/get-books.dto';
import { paginationTransformer } from 'src/common/helper/helper';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(BOOKS_MODEL)
    private readonly model: PaginateModel<IBooksDoc> &
      AggregatePaginateModel<Document<IBooksDoc>>,

    private readonly userService: UsersService,
  ) {}

  async create(createBooksDto: CreateBooksDto, payload: IJwtPayload) {
    return this.model.create({
      ...createBooksDto,
      createdBy: new Types.ObjectId(payload.id),
    });
  }

  async findAll(getBooksDto: GetBooksDto) {
    const { page, pageSize, search } = getBooksDto;

    let match = {};
    if (search) {
      match = {
        $or: [
          {
            title: { $regex: search, $options: 'g' },
          },
          {
            author: { $regex: search, $options: 'g' },
          },
          {
            description: { $regex: search, $options: 'g' },
          },
        ],
      };
    }

    let conditions: PipelineStage[] = [
      {
        $match: match,
      },
      {
        $lookup: {
          from: 'users',
          foreignField: '_id',
          localField: 'createdBy',
          as: 'createdBy',
        },
      },
      {
        $unwind: '$createdBy',
      },
      {
        $project: {
          'createdBy.password': 0,
          'createdBy.salt': 0,
        },
      },
    ];

    const result = await this.model
      .aggregatePaginate(this.model.aggregate(conditions), {
        limit: pageSize,
        offset: (page - 1) * pageSize,
      })
      .then((data) => paginationTransformer(data));

    return result;
  }

  async findOne(id: string) {
    const checkBooks = await this.model
      .findById(id)
      .populate(['createdBy'])
      .exec();
    if (!checkBooks) {
      throw new NotFoundException();
    } else {
      return checkBooks;
    }
  }

  async update(id: string, updateBooksDto: UpdateBooksDto) {
    const books = await this.model.findByIdAndUpdate(
      { _id: id },
      updateBooksDto,
      { returnNewDocument: true },
    );
    if (!books) {
      throw new NotFoundException();
    } else {
      return books;
    }
  }

  async remove(id: string) {
    const books = await this.model.findOneAndDelete({ _id: id });
    if (!books) throw new NotFoundException();
  }
}
