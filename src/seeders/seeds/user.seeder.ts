import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../models';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

export default class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository = dataSource.getRepository(User);
        const users: Partial<User>[] = [];
        const saltRounds = 10;

        for (let i = 0; i < 10; i++) {
            const password = faker.internet.password();
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            users.push({
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: hashedPassword,
                profile_picture_url: faker.image.avatar(),
                bio: faker.lorem.sentence(),
            });
        }

        await repository.insert(users);
    }
}
