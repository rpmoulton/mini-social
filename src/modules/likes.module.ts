import { Module } from '@nestjs/common';
import { CustomRepositoryModule } from 'nestjs-typeorm-custom-repository';
import { LikeRepository } from '../repositories/like.repository';
import { LikeService } from '../services/like.service';
import { LikeController } from '../controllers/like.controller';

@Module({
  imports: [CustomRepositoryModule.forFeature([LikeRepository])],
  providers: [LikeService],
  controllers: [LikeController],
})
export class LikesModule {}
