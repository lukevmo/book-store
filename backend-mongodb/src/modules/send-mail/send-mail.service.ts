import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IUsers } from '../users/interface/users.interface';
import { sendMailConfig } from 'src/configs/configs.constants';

@Injectable()
export class SendMailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(params: any) {
    try {
      return this.mailerService.sendMail(params);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async sendMailRegisterUser(user: IUsers) {
    await this.mailerService.sendMail({
      subject:
        'Welcome to VMO Book Store App - Your Gateway to a World of Books and Inspiration!',
      from: sendMailConfig.user,
      to: user.email,
      text: `
      Dear ${user.fullName},
      
      Welcome to VMO Book Store App! 
      Your one-stop destination for discovering captivating reads, exploring diverse genres, and immersing yourself in the enchanting world of literature. 
      Start your literary journey with us and uncover a treasure trove of books that inspire, entertain, and enlighten. 
      
      Happy reading!
        `,
    });
  }
}
