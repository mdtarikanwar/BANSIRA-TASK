import { Test, TestingModule } from '@nestjs/testing';
import { LeadershipBoardController } from './leadership-board.controller';

describe('LeadershipBoardController', () => {
  let controller: LeadershipBoardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadershipBoardController],
    }).compile();

    controller = module.get<LeadershipBoardController>(LeadershipBoardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
