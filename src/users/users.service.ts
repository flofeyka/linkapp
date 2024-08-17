import { Injectable } from '@nestjs/common';
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user-dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) {
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(dto);
  }

  async getAllUsers(): Promise<Array<User>> {
    return await this.userRepository.findAll();
  }
  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({where: {email}, include: {all: true}});
  }

}
