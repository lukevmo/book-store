import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsOptional } from 'class-validator';
import { IBooks } from '../interface/books.interface';
import { Types } from 'mongoose';

export class ResponseBooksDto implements IBooks {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsNumber()
  publicationYear: number;

  @ApiProperty()
  @IsString()
  genre: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  createdBy: Types.ObjectId;
}
