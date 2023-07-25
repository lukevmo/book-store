import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUsersDto {
  @ApiProperty({ example: 'vmo@gmail.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  @IsNotEmpty()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'vmo' })
  @IsNotEmpty()
  @IsString()
  fullName: string;
}
