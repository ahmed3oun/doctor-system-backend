import { SigninReqDTO, SigninResDTO, IUser, SignupReqDTO, SignupResDTO } from '@app/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { UserRepository } from '../user/user.repository';
import { Doctor, Patient, Secretary } from '@src/schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) { }

  async signIn(body: SigninReqDTO): Promise<SigninResDTO> {
    const current_user = await this.userRepository.findOne({ email: body.login })

    if (!current_user) {
      throw new BadRequestException('Bad Credentials');
    }
    const pwd_matches = await argon.verify(current_user.password, body.password)
    if (!pwd_matches) {
      throw new BadRequestException('Bad Credentials');
    }

    delete current_user.password;

    const payload = {
      id: current_user._id,
      username: current_user.username,
      email: current_user.email,
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('JWT_SECRET'),
      expiresIn: this.configService.getOrThrow('JWT_EXPIRY')
    });

    return {
      user: current_user,
      token,
      message: "Logged in successfully!",
      status: 200
    }
  }

  async signUp(body: SignupReqDTO): Promise<SignupResDTO> {
    const session = await this.userRepository.startTransaction();
    try {
      const current_user = await this.userRepository.findOne({ email: body.email });

      if (current_user) {
        throw new BadRequestException(`This mail address ${body.email} is already existed!`);
      }


      const hashPassword = await argon.hash(body.password)

      const saved_user = await this.userRepository.create({
        email: body.email,
        password: hashPassword,
        username: body.username,
        phone_number: body.phoneNumber,
        role: body.role,
        fullname: body.fullname,
      })


      await session.commitTransaction();

      delete saved_user.password;
      delete saved_user.isDeleted;

      return {
        user: saved_user,
        message: "Registered successfully!",
        status: 201
      }
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  }
}
