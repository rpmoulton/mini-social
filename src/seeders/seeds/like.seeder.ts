import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Like, Post, User } from '../../models';

export default class LikeSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const likeRepository = dataSource.getRepository(Like);
        const userRepository = dataSource.getRepository(User);
        const postRepository = dataSource.getRepository(Post);

        const users = await userRepository.find();
        const posts = await postRepository.find();
        const likes: Partial<Like>[] = [];

        for (let i = 0; i < 10; i++) {
            const user = users[Math.floor(Math.random() * users.length)];
            const post = posts[Math.floor(Math.random() * posts.length)];
            likes.push({
                user_id: user.id,
                post_id: post.id,
            });
        }

        await likeRepository.insert(likes);
    }
}
