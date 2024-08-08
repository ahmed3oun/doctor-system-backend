import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { SigninDTO, SigninResponse } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signin')
  async signIn(
    // @Req() request: Request,
    @Body() body: SigninDTO,
    @Res() response: Response
  ) {
    try {
      const _response: SigninResponse = await this.authService.signIn(body);
      
      return response.status(200).send({
        ..._response
      })
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('This email address doesn\'t exists in database');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /* @Post()
  create(@Body() createAuthDto: any) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  } */
}
