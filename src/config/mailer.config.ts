import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

const configService = new ConfigService();

export const MailerConfig = MailerModule.forRoot({
  transport: {
    host: configService.getOrThrow('SMTP_HOST'),
    port: configService.getOrThrow('SMTP_PORT'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: configService.getOrThrow('SMTP_USER'),
      pass: configService.getOrThrow('SMTP_PASSWORD'),
    },
  },
  defaults: {
    from: '"No Reply" <no-reply@example.com>',
  },
  template: {
    dir: join(__dirname, 'templates'),
    adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
    options: {
      strict: true,
    },
  },
});