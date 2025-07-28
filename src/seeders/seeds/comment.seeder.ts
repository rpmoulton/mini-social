import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Comment, Post, User } from '../../models';
import { faker } from '@faker-js/faker';

export default class CommentSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const commentRepository = dataSource.getRepository(Comment);
        const userRepository = dataSource.getRepository(User);
        const postRepository = dataSource.getRepository(Post);

        const users = await userRepository.find();
        const posts = await postRepository.find();
        const comments: Partial<Comment>[] = [];

        for (let i = 0; i < 10; i++) {
            const user = users[Math.floor(Math.random() * users.length)];
            const post = posts[Math.floor(Math.random() * posts.length)];
            comments.push({
                user_id: user.id,
                post_id: post.id,
                content: faker.lorem.sentence(),
            });
        }

        await commentRepository.insert(comments);
    }
}
