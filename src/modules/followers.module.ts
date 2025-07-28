import { Module } from '@nestjs/common';
import { CustomRepositoryModule } from 'nestjs-typeorm-custom-repository';
import { FollowerRepository } from '../repositories/follower.repository';
import { FollowerService } from '../services/follower.service';
import { FollowerController } from '../controllers/follower.controller';

@Module({
  imports: [CustomRepositoryModule.forFeature([FollowerRepository])],
  providers: [FollowerService],
  controllers: [FollowerController],
})
export class FollowersModule {}
