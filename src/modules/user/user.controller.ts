import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Res, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@src/guards';
import { CurrentUser } from '@src/decorators';
import { User } from '@src/schemas';
import { Response } from 'express';
import { GetMeResDTO, GetUserResDTO, UpdateUserReqDTO, UpdateUserResDTO } from '@app/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

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

  @UseGuards(AuthGuard)
  @Put(':me')
  async update(
    @CurrentUser() _user: User,
    @Body() body: UpdateUserReqDTO,
    @Res() response: Response<UpdateUserResDTO>
  ) {
    try {
      const user = await this.userService.update(_user, body) as User;
      return response.status(200).send({
        message: 'User profile updated successfully!',
        status: 200,
        user
      });
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
