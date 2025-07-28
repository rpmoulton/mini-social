import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Like, Post, User } from '../../src/models';
import { LikeRepository } from '../../src/repositories/like.repository';
import { CreateLikeDto } from '../../src/types/likes/dto/create-like.dto';

describe('LikeRepository', () => {
  let likeRepository: LikeRepository;

  const mockUser = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashedpassword',
  } as User;

  const mockPost = {
    id: 1,
    user_id: 1,
    content: 'This is a test post.',
    user: mockUser,
  } as Post;

  const mockLike = {
    id: 1,
    user_id: 1,
    post_id: 1,
    user: mockUser,
    post: mockPost,
  } as Like;

  const mockLikeRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LikeRepository,
        {
          provide: getRepositoryToken(Like),
          useValue: mockLikeRepository,
        },
      ],
    }).compile();

    likeRepository = module.get<LikeRepository>(LikeRepository);
    likeRepository.create = mockLikeRepository.create.mockReturnValue(mockLike);
    likeRepository.save = mockLikeRepository.save.mockResolvedValue(mockLike);
    likeRepository.findOne = mockLikeRepository.findOne.mockResolvedValue(mockLike);
    likeRepository.delete = mockLikeRepository.delete.mockResolvedValue(undefined as any);
  });

  it('should be defined', () => {
    expect(likeRepository).toBeDefined();
  });

  describe('createLike', () => {
    it('should create and return a like', async () => {
      const createLikeDto: CreateLikeDto = {
        user_id: 1,
        post_id: 1,
      };

      const result = await likeRepository.createLike(createLikeDto);
      expect(result).toEqual(mockLike);
    });
  });

  describe('findLikeById', () => {
    it('should find and return a like by id', async () => {
      const result = await likeRepository.findLikeById(1);
      expect(result).toEqual(mockLike);
    });
  });

  describe('deleteLike', () => {
    it('should delete a like', async () => {
      await likeRepository.deleteLike(1);
      expect(mockLikeRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
