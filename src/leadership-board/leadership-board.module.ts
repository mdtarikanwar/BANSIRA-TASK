// import { Module } from '@nestjs/common';
// import { LeadershipBoardController } from './leadership-board.controller';

// @Module({
//   controllers: [LeadershipBoardController]
// })
// export class LeadershipBoardModule {}



import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { LeadershipBoardService } from './leadership-board.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [LeadershipBoardService],
})
export class LeadershipBoardModule {}
