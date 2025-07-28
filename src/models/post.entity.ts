import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User, Comment, Like } from '.';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne('User', (user: User) => user.posts)
  user: User;

  @OneToMany('Comment', (comment: Comment) => comment.post)
  comments: Comment[];

  @OneToMany('Like', (like: Like) => like.post)
  likes: Like[];
}
