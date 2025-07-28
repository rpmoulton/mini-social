import { Repository } from 'typeorm';
import { User } from '../models';
import { EntityRepository } from 'nestjs-typeorm-custom-repository';
import { CreateUserDto } from '../types/users/dto/create-user.dto';
import { UpdateUserDto } from '../types/users/dto/update-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.create(createUserDto);
    return this.save(user);
  }

  async findUserById(id: number): Promise<User | null> {
    return this.findOne({ where: { id } });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.update(id, updateUserDto);
    return this.findUserById(id);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.findOne({ where: { username } });
  }

  async deleteUser(id: number): Promise<void> {
    await this.delete(id);
  }
}
