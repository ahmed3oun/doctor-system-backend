import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SigninReqDTO, SigninResDTO, SignupReqDTO, SignupResDTO } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signin')
  async signIn(@Body() body: SigninReqDTO, @Res() response: Response) {
    try {
      const res: SigninResDTO = await this.authService.signIn(body);
      return response.status(res.status).send({
        ...res
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('This email address doesn\'t exists in database');
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Post('/signup')
  async signUp(@Body() body: SignupReqDTO, @Res() response: Response) {
    try {
      const res = await this.authService.signUp(body);

      return response.status(res.status).send({
        ...res
      })
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
