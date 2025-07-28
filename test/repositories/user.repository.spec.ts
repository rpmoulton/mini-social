import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/models';
import { UserRepository } from '../../src/repositories/user.repository';
import { CreateUserDto } from '../../src/types/users/dto/create-user.dto';
import { UpdateUserDto } from '../../src/types/users/dto/update-user.dto';

describe('UserRepository', () => {
  let userRepository: UserRepository;

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

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    // Manually wire up the mock implementations to the repository instance
    userRepository.create = mockUserRepository.create.mockReturnValue(mockUser);
    userRepository.save = mockUserRepository.save.mockResolvedValue(mockUser);
    userRepository.findOne = mockUserRepository.findOne.mockResolvedValue(mockUser);
    userRepository.update = mockUserRepository.update.mockResolvedValue(undefined as any);
    userRepository.delete = mockUserRepository.delete.mockResolvedValue(undefined as any);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    it('should create and return a user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword',
      };

      const result = await userRepository.createUser(createUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findUserById', () => {
    it('should find and return a user by id', async () => {
      const result = await userRepository.findUserById(1);
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateUser', () => {
    it('should update a user and return the updated user', async () => {
      const updateUserDto: UpdateUserDto = { username: 'updateduser' };
      // Mock the findOne to return the updated user
      mockUserRepository.findOne.mockResolvedValueOnce({ ...mockUser, ...updateUserDto });

      const result = await userRepository.updateUser(1, updateUserDto);
      expect(result).not.toBeNull();
      if (result) {
        expect(result.username).toEqual('updateduser');
      }
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      await userRepository.deleteUser(1);
      expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
