import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PaginateModel,
  AggregatePaginateModel,
  Document,
  PipelineStage,
  Types,
} from 'mongoose';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { USERS_MODEL } from './schema/users.schema';
import { IUsersDoc } from './interface/users.interface';
import { hashPassword } from '../../common/helper/bcrypt';
import { GetUserDto } from './dto/get-user.dto';
import { paginationTransformer } from 'src/common/helper/helper';
import { SendMailService } from '../send-mail/send-mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USERS_MODEL)
    private readonly usersModel: PaginateModel<IUsersDoc> &
      AggregatePaginateModel<Document<IUsersDoc>>,

    private readonly sendMailService: SendMailService,
  ) {}

  async signUp(createUsersDto: CreateUsersDto) {
    const { email, password } = createUsersDto;
    const userExists = await this.getByEmail(email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const { salt, hashPassword: pass } = await hashPassword(password);

    const user = await this.usersModel.create({
      ...createUsersDto,
      salt,
      password: pass,
    });

    // Send mail //
    await this.sendMailService.sendMailRegisterUser(user);

    return {
      message: 'create user successfully',
    };
  }

  async findAll(getUserDto: GetUserDto) {
    const { page, pageSize, search } = getUserDto;

    let match = {};
    if (search) {
      match = {
        $or: [
          {
            email: { $regex: search, $options: 'g' },
          },
          {
            fullName: { $regex: search, $options: 'g' },
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
          from: 'books',
          foreignField: 'createdBy',
          localField: '_id',
          as: 'books',
        },
      },
      {
        $project: {
          password: 0,
          salt: 0,
        },
      },
    ];

    const result = await this.usersModel
      .aggregatePaginate(this.usersModel.aggregate(conditions), {
        limit: pageSize,
        offset: (page - 1) * pageSize,
      })
      .then((data) => paginationTransformer(data));

    return result;
  }

  async findOne(id: string) {
    const result = await this.usersModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'books',
          foreignField: 'createdBy',
          localField: '_id',
          as: 'books',
        },
      },
      {
        $project: {
          password: 0,
          salt: 0,
        },
      },
    ]);

    if (result.length === 0) {
      throw new NotFoundException();
    }

    return result[0];
  }

  async update(id: string, updateUsersDto: UpdateUsersDto) {
    const users = await this.usersModel
      .findByIdAndUpdate({ _id: id }, updateUsersDto, {
        returnDocument: 'after',
      })
      .select('email fullName')
      .lean();
    if (!users) {
      throw new NotFoundException();
    } else {
      return users;
    }
  }

  async remove(id: string) {
    const users = await this.usersModel.findOneAndDelete({ _id: id });
    if (!users) throw new NotFoundException();
  }

  async getByEmail(email: string) {
    const user = await this.usersModel.findOne({ email });
    if (!user) {
      return null;
    }
    return user;
  }
}
