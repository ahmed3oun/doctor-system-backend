import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from '@schemas';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserModule]
})
export class UserModule { }
