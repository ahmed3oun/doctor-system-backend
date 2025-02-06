import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
// import { MailingController } from './mailing.controller';
import { MailerConfig } from '@src/config/mailer.config';

@Module({
  imports: [MailerConfig],
  controllers: [/* MailingController */],
  providers: [MailingService],
})
export class MailingModule {}
