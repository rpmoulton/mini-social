import { Module } from '@nestjs/common';
import { CustomRepositoryModule } from 'nestjs-typeorm-custom-repository';
import { CommentRepository } from '../repositories/comment.repository';
import { CommentService } from '../services/comment.service';
import { CommentController } from '../controllers/comment.controller';

@Module({
  imports: [CustomRepositoryModule.forFeature([CommentRepository])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentsModule {}
