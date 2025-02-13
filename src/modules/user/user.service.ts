import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, Patient, Secretary, User } from '@src/schemas';
import { UpdateUserReqDTO } from '@app/common';


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

  async update(user: User, updateUserDto: UpdateUserReqDTO) {
    switch (user.role) {
      case 'DOCTOR':
        if (!user.doctor) {
          const new_doctor = await this.doctorModel.create({ ...updateUserDto?.doctor, user: user._id })
          return await this.userModel.findOneAndUpdate({ _id: user._id }, { doctor: new_doctor._id })
        } else {
          return await this.doctorModel.findOneAndUpdate({ _id: user.doctor }, { ...updateUserDto?.doctor })
        }
      case 'SECRETARY':
        if (!user.secretary) {
          const new_secretary = await this.secretaryModel.create({ ...updateUserDto?.secretary, user: user._id })
          return await this.userModel.findOneAndUpdate({ _id: user._id }, { secretary: new_secretary._id })
        } else {
          return await this.secretaryModel.findOneAndUpdate({ _id: user.secretary, ...updateUserDto?.secretary })
        }
      case 'PATIENT':
        if (!user.patient) {
          const new_patient = await this.patientModel.create({ ...updateUserDto?.patient, user: user._id })
          return await this.userModel.findOneAndUpdate({ _id: user._id }, { patient: new_patient._id })
        } else {
          return await this.patientModel.findOneAndUpdate({ _id: user.patient, ...updateUserDto?.patient })
        }
      default:
        break;
    }
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
