import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeRepository } from '../repositories/like.repository';
import { CreateLikeDto } from '../types/likes/dto/create-like.dto';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeRepository)
    private readonly likeRepository: LikeRepository,
  ) {}

  create(createLikeDto: CreateLikeDto) {
    return this.likeRepository.createLike(createLikeDto);
  }

  findAll() {
    return this.likeRepository.find();
  }

  findOne(id: number) {
    return this.likeRepository.findLikeById(id);
  }

  remove(id: number) {
    return this.likeRepository.deleteLike(id);
  }
}
