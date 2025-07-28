import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowerRepository } from '../repositories/follower.repository';
import { CreateFollowerDto } from '../types/followers/dto/create-follower.dto';

@Injectable()
export class FollowerService {
  constructor(
    @InjectRepository(FollowerRepository)
    private readonly followerRepository: FollowerRepository,
  ) {}

  create(createFollowerDto: CreateFollowerDto) {
    return this.followerRepository.createFollower(createFollowerDto);
  }

  findAll() {
    return this.followerRepository.find();
  }

  findOne(follower_id: number, followed_id: number) {
    return this.followerRepository.findFollower(follower_id, followed_id);
  }

  remove(follower_id: number, followed_id: number) {
    return this.followerRepository.deleteFollower(follower_id, followed_id);
  }
}
