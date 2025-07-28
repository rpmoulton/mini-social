import { Repository } from 'typeorm';
import { Post } from '../models';
import { EntityRepository } from 'nestjs-typeorm-custom-repository';
import { CreatePostDto } from '../types/posts/dto/create-post.dto';
import { UpdatePostDto } from '../types/posts/dto/update-post.dto';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.create(createPostDto);
    return this.save(post);
  }

  async findPostById(id: number): Promise<Post | null> {
    return this.findOne({ where: { id } });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Post | null> {
    await this.update(id, updatePostDto);
    return this.findPostById(id);
  }

  async deletePost(id: number): Promise<void> {
    await this.delete(id);
  }
}
