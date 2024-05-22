import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../domain/dto/create-user.dto';
import { UpdateUserDto } from '../domain/dto/update-user.dto';
import { UserRepository } from '../infrastructure/db/user.repository';

@Injectable()
export class UsersService {
  constructor(@Inject(UserRepository) private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneByEmail(email);
  }

  async findOneByEmailWithPassword(email: string) {
    return await this.userRepository.findOneByEmailWithPassword(email);
  }

  async findOne(id: string) {
    return await this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.remove(id);
  }
}
