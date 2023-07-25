import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { ResponseUsersDto } from './dto/response-users.dto';
import { Params } from './dto/params.dto';
import { GetUserDto } from './dto/get-user.dto';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOkResponse({ type: ResponseUsersDto })
  create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.signUp(createUsersDto);
  }

  @Get()
  @ApiOkResponse({ type: [ResponseUsersDto] })
  findAll(@Query() getUserDto: GetUserDto) {
    return this.usersService.findAll(getUserDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseUsersDto })
  findOne(@Param() params: Params) {
    return this.usersService.findOne(params.id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResponseUsersDto })
  update(@Param() params: Params, @Body() updateUsersDto: UpdateUsersDto) {
    return this.usersService.update(params.id, updateUsersDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param() params: Params) {
    return this.usersService.remove(params.id);
  }
}
