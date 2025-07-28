import { DataSource } from 'typeorm';
import { User } from './src/models/user.entity';
import { Post } from './src/models/post.entity';
import { Comment } from './src/models/comment.entity';
import { Like } from './src/models/like.entity';
import { Follower } from './src/models/follower.entity';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [User, Post, Comment, Like, Follower],
  synchronize: true, // DEV only, do not use in production
});
