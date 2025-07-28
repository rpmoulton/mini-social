import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from '../repositories/post.repository';
import { CreatePostDto } from '../types/posts/dto/create-post.dto';
import { UpdatePostDto } from '../types/posts/dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private readonly postRepository: PostRepository,
  ) {}

  create(createPostDto: CreatePostDto) {
    return this.postRepository.createPost(createPostDto);
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return this.postRepository.findPostById(id);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.updatePost(id, updatePostDto);
  }

  remove(id: number) {
    return this.postRepository.deletePost(id);
  }
}
