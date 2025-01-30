import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@src/schemas';
import { Model } from 'mongoose';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    this.logger.log(`Request: ${JSON.stringify(request.headers)}`);
    const token = this.extractTokenFromHeader(request);
    this.logger.log(`Token: ${token}`);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.getOrThrow('JWT_SECRET')
      });
      let current_user;

      switch ((await this.userModel.findOne({ _id: payload.id })).role) {
        case 'DOCTOR':
          current_user = await current_user.populate('Doctor').exec()
        case 'SECRETARY':
          current_user = await current_user.populate('Secretary').exec()
        case 'PATIENT':
          current_user = await current_user.populate('Patient').exec()
        default:
          current_user = await current_user;
      }
      delete current_user.created_at;
      delete current_user.updated_at;
      delete current_user.password;
      delete current_user.isDeleted;
      request.user = current_user;
      this.logger.log(`Current User: ${JSON.stringify(current_user)}`);
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
    return true;
  }

  private extractTokenFromHeader = (request: Request): string | undefined => {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  };
}
