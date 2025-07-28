import { Entity, Column, CreateDateColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '.';

@Entity('followers')
export class Follower {
  @PrimaryColumn()
  follower_id: number;

  @PrimaryColumn()
  followed_id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne('User', (user: User) => user.following)
  follower: User;

  @ManyToOne('User', (user: User) => user.followers)
  followed: User;
}
