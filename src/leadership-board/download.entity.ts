import { Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToOne } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Download {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Book, book => book.downloads)
  book: Book;
}
