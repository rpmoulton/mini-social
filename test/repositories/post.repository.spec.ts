import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post, User } from '../../src/models';
import { PostRepository } from '../../src/repositories/post.repository';
import { CreatePostDto } from '../../src/types/posts/dto/create-post.dto';
import { UpdatePostDto } from '../../src/types/posts/dto/update-post.dto';

describe('PostRepository', () => {
  let postRepository: PostRepository;

  const mockUser: User = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashedpassword',
    profile_picture_url: null,
    bio: null,
    created_at: new Date(),
    posts: [],
    comments: [],
    likes: [],
    followers: [],
    following: [],
  };

  const mockPost: Post = {
    id: 1,
    user_id: 1,
    content: 'This is a test post.',
    created_at: new Date(),
    user: mockUser,
    comments: [],
    likes: [],
  };

  const mockPostRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostRepository,
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostRepository,
        },
      ],
    }).compile();

    postRepository = module.get<PostRepository>(PostRepository);
    postRepository.create = mockPostRepository.create.mockReturnValue(mockPost);
    postRepository.save = mockPostRepository.save.mockResolvedValue(mockPost);
    postRepository.findOne = mockPostRepository.findOne.mockResolvedValue(mockPost);
    postRepository.update = mockPostRepository.update.mockResolvedValue(undefined as any);
    postRepository.delete = mockPostRepository.delete.mockResolvedValue(undefined as any);
  });

  it('should be defined', () => {
    expect(postRepository).toBeDefined();
  });

  describe('createPost', () => {
    it('should create and return a post', async () => {
      const createPostDto: CreatePostDto = {
        user_id: 1,
        content: 'This is a test post.',
      };

      const result = await postRepository.createPost(createPostDto);
      expect(result).toEqual(mockPost);
    });
  });

  describe('findPostById', () => {
    it('should find and return a post by id', async () => {
      const result = await postRepository.findPostById(1);
      expect(result).toEqual(mockPost);
    });
  });

  describe('updatePost', () => {
    it('should update a post and return the updated post', async () => {
      const updatePostDto: UpdatePostDto = { content: 'This is an updated post.' };
      mockPostRepository.findOne.mockResolvedValueOnce({ ...mockPost, ...updatePostDto });

      const result = await postRepository.updatePost(1, updatePostDto);
      expect(result).not.toBeNull();
      if (result) {
        expect(result.content).toEqual('This is an updated post.');
      }
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      await postRepository.deletePost(1);
      expect(mockPostRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
