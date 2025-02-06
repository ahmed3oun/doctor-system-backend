import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailingService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService
    ) { }

    async sendUserConfirmation(email: string, username: string, token: string): Promise<void> {
        const url = `${this.configService.getOrThrow('FRONTEND_URL')}/auth/confirm/${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'User Confirmation',
            template: './confirmation',
            context: {
                username,
                url
            }
        });
    }
}
