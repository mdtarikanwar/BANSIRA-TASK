import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { Department } from './department.entity';
import { Download } from './download.entity';
import { subDays, subMonths, subWeeks, format } from 'date-fns';

@Injectable()
export class LeadershipBoardService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Download)
    private readonly downloadRepository: Repository<Download>,
  ) {}

  async getPopularDepartments(): Promise<Department[]> {
    const rawQuery = `
        SELECT department.*, SUM(book.downloadCount) as totalDownloads
        FROM department
        LEFT JOIN book ON book.departmentId = department.id
        GROUP BY department.id
        ORDER BY totalDownloads DESC
        LIMIT 5
    `;

  const departments = await this.departmentRepository.query(rawQuery);
  return departments;
  }

  async downloadBook(departmentName: string, bookTitle: string): Promise<Book> {

    const book = await this.bookRepository
      .createQueryBuilder('book')
      .innerJoinAndSelect('book.department', 'department')
      .where('department.name = :departmentName', { departmentName })
      .andWhere('book.title = :bookTitle', { bookTitle })
      .getOne();

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    book.downloadCount += 1;
    await this.bookRepository.save(book);

    const download = new Download();
    download.book = book;
    await this.downloadRepository.save(download);

    return book;
  }

  async getPopularBooks(period:String): Promise<Book[]> {
    let queryDateData; 
    
    switch (period) {
        case 'weekly':
            queryDateData = subWeeks(new Date(), 1);
        case 'monthly':
            queryDateData = subMonths(new Date(), 1);
        case 'daily':
            queryDateData = subDays(new Date(), 1);
    }

    const queryDateDataFormatted = format(queryDateData, 'yyyy-MM-dd HH:mm:ss');

    const query = `
        SELECT book.*, COUNT(download.id) as downloadCount, department.id as departmentId, department.name as departmentName
        FROM book
        LEFT JOIN download ON book.id = download.bookId
        LEFT JOIN department ON book.departmentId = department.id
        WHERE download.date >= ?
        GROUP BY book.id
        ORDER BY downloadCount DESC`;

    const booksData: any[] = await this.bookRepository.query(query, [queryDateDataFormatted]);

    const books: Book[] = booksData.map(bookData => {
      const book = new Book();
      book.id = bookData.id;
      book.title = bookData.title;
      book.author = bookData.author;
      book.isbn = bookData.isbn;
      book.genre = bookData.genre;
      book.publicationYear = bookData.publicationYear;
      book.available = bookData.available;
      book.downloadCount = bookData.downloadCount;
      book.department = {
        id: bookData.departmentId,
        name: bookData.departmentName,
        books: null
      };
      return book;
    });

    return books;
  }

}
