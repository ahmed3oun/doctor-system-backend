import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@src/schemas';
import { Model } from 'mongoose';
// import { IUser } from '@app/common';

// declare global {
//   namespace Express
//     interface Request {
//       user?: IUser;
//     }
// }

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
      const curr_user = await this.userModel.findOne({ _id: payload.id });
      switch (curr_user.role) {
        case 'DOCTOR':
          current_user = curr_user?.doctor ? await curr_user.populate('Doctor') : curr_user as User;
        case 'SECRETARY':
          current_user = curr_user?.secretary ? await current_user.populate('Secretary') : curr_user as User;
        case 'PATIENT':
          current_user = curr_user?.patient ? await current_user.populate('Patient').exec() : curr_user as User;
        default:
          current_user = await curr_user;
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
