import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User, Post } from '.';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  post_id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne('User', (user: User) => user.likes)
  user: User;

  @ManyToOne('Post', (post: Post) => post.likes)
  post: Post;
}
