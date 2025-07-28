import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FollowerService } from '../services/follower.service';
import { CreateFollowerDto } from '../types/followers/dto/create-follower.dto';

@Controller('followers')
@UseGuards(JwtAuthGuard)
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Post()
  create(@Body() createFollowerDto: CreateFollowerDto) {
    return this.followerService.create(createFollowerDto);
  }

  @Get()
  findAll() {
    return this.followerService.findAll();
  }

  @Get(':follower_id/:followed_id')
  findOne(@Param('follower_id') follower_id: string, @Param('followed_id') followed_id: string) {
    return this.followerService.findOne(+follower_id, +followed_id);
  }

  @Delete(':follower_id/:followed_id')
  remove(@Param('follower_id') follower_id: string, @Param('followed_id') followed_id: string) {
    return this.followerService.remove(+follower_id, +followed_id);
  }
}
