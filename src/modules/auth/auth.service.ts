import { SigninDTO, SigninResponse, User } from '@app/common';
import { Injectable } from '@nestjs/common';
import argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {

  constructor(private readonly prismaService: PrismaService) { }

  async signIn(body: SigninDTO) : Promise<SigninResponse | any>{
    const _user = await this.prismaService.user.findUniqueOrThrow({
      where : {
        email: body.login
      }
    });
    // const pwd_matches = argon.verify(_user.password)
    // const pwdMatches = await argon.verify(
    //   user,
    //   body.password,
    // );
    return {
      // user,
      message: "Logged in successfully!"
    }
  }


  /* create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auths`;
  }

  findOne(id: number) {
    return `This action returns a #id auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #id auth`;
  }

  remove(id: number) {
    return `This action removes a #id auth`;
  } */
}
