import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { sendMailConfig } from '../../configs/configs.constants';
import { SendMailService } from './send-mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: sendMailConfig.host,
        secure: false,
        auth: {
          user: sendMailConfig.user,
          pass: sendMailConfig.password,
        },
        tls: { rejectUnauthorized: false },
      },
      defaults: {
        from: '"No Reply" ' + sendMailConfig.user,
      },
    }),
  ],
  providers: [SendMailService],
  exports: [SendMailService],
})
export class SendMailModule {}
