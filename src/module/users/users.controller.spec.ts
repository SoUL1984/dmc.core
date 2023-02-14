import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersController],
    }).compile();

    controller = moduleFixture.get<UsersController>(UsersController);
  });

  describe('getAll', () => {
    it('Должен получить всех пользователей', () => {
      controller.getAll();
    });
  });
});
