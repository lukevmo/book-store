import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IUsers } from '../interface/users.interface';

export class ResponseUsersDto implements IUsers {
  @ApiProperty()
  _id: object;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  salt: string;
}
