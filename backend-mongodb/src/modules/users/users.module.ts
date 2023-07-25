import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersSchema, USERS_MODEL } from './schema/users.schema';
import { UsersController } from './users.controller';
import { SendMailModule } from '../send-mail/send-mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USERS_MODEL, schema: UsersSchema }]),
    SendMailModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
