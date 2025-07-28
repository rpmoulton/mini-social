import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Post, User } from '../../models';
import { faker } from '@faker-js/faker';

export default class PostSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const postRepository = dataSource.getRepository(Post);
        const userRepository = dataSource.getRepository(User);

        const users = await userRepository.find();
        const posts: Partial<Post>[] = [];

        for (let i = 0; i < 10; i++) {
            const user = users[Math.floor(Math.random() * users.length)];
            posts.push({
                user_id: user.id,
                content: faker.lorem.paragraphs(2),
            });
        }

        await postRepository.insert(posts);
    }
}
