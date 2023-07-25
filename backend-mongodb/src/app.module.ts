import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './modules/books/books.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SendMailModule } from './modules/send-mail/send-mail.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
      }),
    }),
    BooksModule,
    UsersModule,
    AuthModule,
    SendMailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
