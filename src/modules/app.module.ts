import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users.module';
import { PostsModule } from './posts.module';
import { CommentsModule } from './comments.module';
import { LikesModule } from './likes.module';
import { FollowersModule } from './followers.module';
import { AuthModule } from './auth.module';
import { User } from '../models/user.entity';
import { Post } from '../models/post.entity';
import { Comment } from '../models/comment.entity';
import { Like } from '../models/like.entity';
import { Follower } from '../models/follower.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Post, Comment, Like, Follower],
        synchronize: true, // Dev only
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    FollowersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

