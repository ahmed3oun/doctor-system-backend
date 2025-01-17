import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@src/guards';
import { CurrentUser } from '@src/decorators';
import { User } from '@src/schemas';
import { Response } from 'express';
import { GetMeResDTO, GetUserResDTO } from '@app/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('me')
  findMe(@CurrentUser() user: User, @Res() response: Response<GetMeResDTO>) {
    try {
      return response.status(200).send({
        user,
        message: 'User founded successfully!',
        status: 200
      });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response<GetUserResDTO>) {
    try {
      const user = await this.userService.findOne(id);
      return response.status(200).send({
        message: 'User founded successfully!',
        status: 200,
        user
      });
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
