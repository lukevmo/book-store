import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBooksDto } from './dto/create-books.dto';
import { UpdateBooksDto } from './dto/update-books.dto';
import { ResponseBooksDto } from './dto/response-books.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user-decorator';
import IJwtPayload from '../auth/payloads/jwt-payload';
import { GetBooksDto } from './dto/get-books.dto';

@ApiTags('Books')
@Controller('books')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOkResponse({ type: ResponseBooksDto })
  create(
    @GetUser() payload: IJwtPayload,
    @Body() createBooksDto: CreateBooksDto,
  ) {
    return this.booksService.create(createBooksDto, payload);
  }

  @Get()
  @ApiOkResponse({ type: [ResponseBooksDto] })
  findAll(@Query() getBooksDto: GetBooksDto) {
    return this.booksService.findAll(getBooksDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: ResponseBooksDto })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ResponseBooksDto })
  update(@Param('id') id: string, @Body() updateBooksDto: UpdateBooksDto) {
    return this.booksService.update(id, updateBooksDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
