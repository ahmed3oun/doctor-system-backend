import { SigninReqDTO, SigninResDTO, IUser, SignupReqDTO, SignupResDTO } from '@app/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  async signIn(body: SigninReqDTO): Promise<SigninResDTO> {
    const current_user = await this.prismaService.user.findUniqueOrThrow({
      where: {
        email: body.login
      }
    }) as IUser;
    const pwd_matches = await argon.verify(current_user.password, body.password);
    if (!pwd_matches) {
      throw new BadRequestException('Bad Credentials');
    }

    delete current_user.password;

    const payload = {
      id: current_user.id,
      username: current_user.username,
      email: current_user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      user: current_user,
      token,
      message: "Logged in successfully!",
      status: 200
    }
  }

  async signUp(body: SignupReqDTO): Promise<SignupResDTO> {
    const hashPassword = await argon.hash(body.password)

    const saved_user = this.prismaService.user.create({
      data: {
        email: body.email,
        password: hashPassword,
        username: body.username,
        phoneNumber: body.phoneNumber,
        role: "DOCTOR",
        fullname: body.fullname
      }
    }) as unknown as IUser;

    delete saved_user.password;

    return {
      user: saved_user,
      message: "Registered successfully!",
      status: 201
    }
  }
}
