import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comment, Post, User } from '../../src/models';
import { CommentRepository } from '../../src/repositories/comment.repository';
import { CreateCommentDto } from '../../src/types/comments/dto/create-comment.dto';
import { UpdateCommentDto } from '../../src/types/comments/dto/update-comment.dto';

describe('CommentRepository', () => {
  let commentRepository: CommentRepository;

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

  const mockComment: Comment = {
    id: 1,
    user_id: 1,
    post_id: 1,
    content: 'This is a test comment.',
    created_at: new Date(),
    user: mockUser,
    post: mockPost,
  };

  const mockCommentRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentRepository,
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository,
        },
      ],
    }).compile();

    commentRepository = module.get<CommentRepository>(CommentRepository);
    commentRepository.create = mockCommentRepository.create.mockReturnValue(mockComment);
    commentRepository.save = mockCommentRepository.save.mockResolvedValue(mockComment);
    commentRepository.findOne = mockCommentRepository.findOne.mockResolvedValue(mockComment);
    commentRepository.update = mockCommentRepository.update.mockResolvedValue(undefined as any);
    commentRepository.delete = mockCommentRepository.delete.mockResolvedValue(undefined as any);
  });

  it('should be defined', () => {
    expect(commentRepository).toBeDefined();
  });

  describe('createComment', () => {
    it('should create and return a comment', async () => {
      const createCommentDto: CreateCommentDto = {
        user_id: 1,
        post_id: 1,
        content: 'This is a test comment.',
      };

      const result = await commentRepository.createComment(createCommentDto);
      expect(result).toEqual(mockComment);
    });
  });

  describe('findCommentById', () => {
    it('should find and return a comment by id', async () => {
      const result = await commentRepository.findCommentById(1);
      expect(result).toEqual(mockComment);
    });
  });

  describe('updateComment', () => {
    it('should update a comment and return the updated comment', async () => {
      const updateCommentDto: UpdateCommentDto = { content: 'This is an updated comment.' };
      mockCommentRepository.findOne.mockResolvedValueOnce({ ...mockComment, ...updateCommentDto });

      const result = await commentRepository.updateComment(1, updateCommentDto);
      expect(result).not.toBeNull();
      if (result) {
        expect(result.content).toEqual('This is an updated comment.');
      }
    });
  });

  describe('deleteComment', () => {
    it('should delete a comment', async () => {
      await commentRepository.deleteComment(1);
      expect(mockCommentRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
