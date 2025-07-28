import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Post, Comment, Like, Follower } from '.';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  profile_picture_url: string | null;

  @Column('text', { nullable: true })
  bio: string | null;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany('Post', (post: Post) => post.user)
  posts: Post[];

  @OneToMany('Comment', (comment: Comment) => comment.user)
  comments: Comment[];

  @OneToMany('Like', (like: Like) => like.user)
  likes: Like[];

  @OneToMany('Follower', (follower: Follower) => follower.followed)
  followers: Follower[];

  @OneToMany('Follower', (follower: Follower) => follower.follower)
  following: Follower[];
}
