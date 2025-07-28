import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User, Post } from '.';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  post_id: number;

  @Column()
  user_id: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne('User', (user: User) => user.comments)
  user: User;

  @ManyToOne('Post', (post: Post) => post.comments)
  post: Post;
}
