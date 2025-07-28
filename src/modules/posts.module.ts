import { Module } from '@nestjs/common';
import { CustomRepositoryModule } from 'nestjs-typeorm-custom-repository';
import { PostRepository } from '../repositories/post.repository';
import { PostService } from '../services/post.service';
import { PostController } from '../controllers/post.controller';

@Module({
  imports: [CustomRepositoryModule.forFeature([PostRepository])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostsModule {}
