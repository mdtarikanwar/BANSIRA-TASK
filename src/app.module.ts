import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { Department } from './leadership-board/department.entity';
import { Book } from './leadership-board/book.entity';
import { LeadershipBoardService } from './leadership-board/leadership-board.service';
import { LeadershipBoardController } from './leadership-board/leadership-board.controller';
import { Download } from './leadership-board/download.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'library',
      entities: [Department, Book, Download],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Department, Book, Download]),
    ScheduleModule.forRoot(),
  ],
  providers: [LeadershipBoardService],
  controllers: [LeadershipBoardController],
})
export class AppModule {}