import { Repository } from 'typeorm';
import { Comment } from '../models';
import { EntityRepository } from 'nestjs-typeorm-custom-repository';
import { CreateCommentDto } from '../types/comments/dto/create-comment.dto';
import { UpdateCommentDto } from '../types/comments/dto/update-comment.dto';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.create(createCommentDto);
    return this.save(comment);
  }

  async findCommentById(id: number): Promise<Comment | null> {
    return this.findOne({ where: { id } });
  }

  async updateComment(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment | null> {
    await this.update(id, updateCommentDto);
    return this.findCommentById(id);
  }

  async deleteComment(id: number): Promise<void> {
    await this.delete(id);
  }
}
