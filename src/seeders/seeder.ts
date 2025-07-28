import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { User } from '../models/user.entity';
import { Post } from '../models/post.entity';
import { Comment } from '../models/comment.entity';
import { Like } from '../models/like.entity';
import { Follower } from '../models/follower.entity';
import UserSeeder from './seeds/user.seeder';
import PostSeeder from './seeds/post.seeder';
import CommentSeeder from './seeds/comment.seeder';
import LikeSeeder from './seeds/like.seeder';
import FollowerSeeder from './seeds/follower.seeder';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [User, Post, Comment, Like, Follower],
    seeds: [UserSeeder, PostSeeder, CommentSeeder, LikeSeeder, FollowerSeeder]
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
    process.exit();
});
