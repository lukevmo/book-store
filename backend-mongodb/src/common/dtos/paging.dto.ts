import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumberString, IsOptional, IsString, Min } from 'class-validator';

export class CommonPagingnationDto {
  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @Min(1)
  page: number;

  @ApiProperty({ default: 10 })
  @Type(() => Number)
  @Min(1)
  pageSize: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  search: string;
}
