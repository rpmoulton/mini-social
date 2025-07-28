import { Repository } from 'typeorm';
import { Like } from '../models';
import { EntityRepository } from 'nestjs-typeorm-custom-repository';
import { CreateLikeDto } from '../types/likes/dto/create-like.dto';

@EntityRepository(Like)
export class LikeRepository extends Repository<Like> {
  async createLike(createLikeDto: CreateLikeDto): Promise<Like> {
    const like = this.create(createLikeDto);
    return this.save(like);
  }

  async findLikeById(id: number): Promise<Like | null> {
    return this.findOne({ where: { id } });
  }

  async deleteLike(id: number): Promise<void> {
    await this.delete(id);
  }
}
