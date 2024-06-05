import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { LeadershipBoardService } from './leadership-board.service';
import { Department } from './department.entity';

@Controller('leadership-board')
export class LeadershipBoardController {
  constructor(private readonly leadershipBoardService: LeadershipBoardService) {}

  // For downloading the book, will take department and book title as input parameter.
  @Post('download')
  downloadBook(@Body() requestBody:{department:string, title:string}) 
  {
    const { department, title } = requestBody;
    return this.leadershipBoardService.downloadBook(department, title);
  }

  @Get('popular-departments')
  getPopularDepartments() {
    return this.leadershipBoardService.getPopularDepartments();
  }

  @Get('popular-books')
  getPopularBooks(@Body('period') period: String) {
    return this.leadershipBoardService.getPopularBooks(period);
  }
}
