import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follower, User } from '../../src/models';
import { FollowerRepository } from '../../src/repositories/follower.repository';
import { CreateFollowerDto } from '../../src/types/followers/dto/create-follower.dto';

describe('FollowerRepository', () => {
  let followerRepository: FollowerRepository;

  const mockUser1 = { id: 1, username: 'user1' } as User;
  const mockUser2 = { id: 2, username: 'user2' } as User;

  const mockFollower = {
    follower_id: 1,
    followed_id: 2,
    follower: mockUser1,
    followed: mockUser2,
  } as Follower;

  const mockFollowerRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FollowerRepository,
        {
          provide: getRepositoryToken(Follower),
          useValue: mockFollowerRepository,
        },
      ],
    }).compile();

    followerRepository = module.get<FollowerRepository>(FollowerRepository);
    followerRepository.create = mockFollowerRepository.create.mockReturnValue(mockFollower);
    followerRepository.save = mockFollowerRepository.save.mockResolvedValue(mockFollower);
    followerRepository.findOne = mockFollowerRepository.findOne.mockResolvedValue(mockFollower);
    followerRepository.delete = mockFollowerRepository.delete.mockResolvedValue(undefined as any);
  });

  it('should be defined', () => {
    expect(followerRepository).toBeDefined();
  });

  describe('createFollower', () => {
    it('should create and return a follower relationship', async () => {
      const createFollowerDto: CreateFollowerDto = {
        follower_id: 1,
        followed_id: 2,
      };

      const result = await followerRepository.createFollower(createFollowerDto);
      expect(result).toEqual(mockFollower);
    });
  });

  describe('findFollower', () => {
    it('should find and return a follower relationship by composite key', async () => {
      const result = await followerRepository.findFollower(1, 2);
      expect(result).toEqual(mockFollower);
      expect(mockFollowerRepository.findOne).toHaveBeenCalledWith({ where: { follower_id: 1, followed_id: 2 } });
    });
  });

  describe('deleteFollower', () => {
    it('should delete a follower relationship', async () => {
      await followerRepository.deleteFollower(1, 2);
      expect(mockFollowerRepository.delete).toHaveBeenCalledWith({ follower_id: 1, followed_id: 2 });
    });
  });
});
