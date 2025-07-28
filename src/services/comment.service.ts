import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from '../repositories/comment.repository';
import { CreateCommentDto } from '../types/comments/dto/create-comment.dto';
import { UpdateCommentDto } from '../types/comments/dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    return this.commentRepository.createComment(createCommentDto);
  }

  findAll() {
    return this.commentRepository.find();
  }

  findOne(id: number) {
    return this.commentRepository.findCommentById(id);
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentRepository.updateComment(id, updateCommentDto);
  }

  remove(id: number) {
    return this.commentRepository.deleteComment(id);
  }
}
