import { Repository } from 'typeorm';
import { Follower } from '../models';
import { EntityRepository } from 'nestjs-typeorm-custom-repository';
import { CreateFollowerDto } from '../types/followers/dto/create-follower.dto';

@EntityRepository(Follower)
export class FollowerRepository extends Repository<Follower> {
  async createFollower(createFollowerDto: CreateFollowerDto): Promise<Follower> {
    const follower = this.create(createFollowerDto);
    return this.save(follower);
  }

  async findFollower(follower_id: number, followed_id: number): Promise<Follower | null> {
    return this.findOne({ where: { follower_id, followed_id } });
  }

  async deleteFollower(follower_id: number, followed_id: number): Promise<void> {
    await this.delete({ follower_id, followed_id });
  }
}
