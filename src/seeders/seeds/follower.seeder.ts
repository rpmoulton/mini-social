import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Follower, User } from '../../models';

export default class FollowerSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const followerRepository = dataSource.getRepository(Follower);
        const userRepository = dataSource.getRepository(User);

        const users = await userRepository.find();
        const followers: Partial<Follower>[] = [];

        for (let i = 0; i < 10; i++) {
            const follower = users[Math.floor(Math.random() * users.length)];
            const followed = users[Math.floor(Math.random() * users.length)];

            // Ensure a user doesn't follow themselves and the relationship doesn't already exist
            if (follower.id !== followed.id) {
                followers.push({
                    follower_id: follower.id,
                    followed_id: followed.id,
                });
            }
        }

        // Remove duplicates
        const uniqueFollowers = followers.filter((v, i, a) => a.findIndex(t => (t.follower_id === v.follower_id && t.followed_id === v.followed_id)) === i);

        await followerRepository.insert(uniqueFollowers);
    }
}
