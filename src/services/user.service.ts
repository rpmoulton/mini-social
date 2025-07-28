import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user.entity';
import { CreateUserDto } from '../types/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../types/users/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const userToCreate = { ...createUserDto, password: hashedPassword };
    return this.userRepository.createUser(userToCreate);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findUserById(id);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneByUsername(username);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUser(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.deleteUser(id);
  }
}
