import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateBooksDto {
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
}
