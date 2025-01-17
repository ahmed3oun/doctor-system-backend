import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, Patient, Secretary, User } from '@src/schemas';


@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Doctor.name) private readonly doctorModel: Model<Doctor>,
    @InjectModel(Patient.name) private readonly patientModel: Model<Patient>,
    @InjectModel(Secretary.name) private readonly secretaryModel: Model<Secretary>
  ) { }

  create(createUserDto: any) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(_id: string) {
    // const user =  await this.userRepository.findOne({ _id });
    const user = this.userModel.findOne({ _id })
    switch ((await user).role) {
      case 'DOCTOR':
        return await user.populate('Doctor').exec()
      case 'SECRETARY':
        return await user.populate('Secretary').exec()
      case 'PATIENT':
        return await user.populate('Patient').exec()
      default:
        return await user;
    }
  }

  update(id: string, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
