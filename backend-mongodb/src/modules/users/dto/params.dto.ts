import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class Params {
  @ApiProperty({ example: '64beb4eadd3f8c655fe5ffed' })
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}
