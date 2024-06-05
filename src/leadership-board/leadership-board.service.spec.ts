import { Test, TestingModule } from '@nestjs/testing';
import { LeadershipBoardService } from './leadership-board.service';

describe('LeadershipBoardService', () => {
  let service: LeadershipBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadershipBoardService],
    }).compile();

    service = module.get<LeadershipBoardService>(LeadershipBoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
