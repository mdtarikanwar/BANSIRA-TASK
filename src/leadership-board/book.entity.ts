import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Department } from './department.entity';
import { Download } from './download.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  isbn: string;

  @Column()
  genre: string;

  @Column()
  publicationYear: number;

  @Column()
  available: boolean;

  @Column({ default: 0 })
  downloadCount: number;

  @ManyToOne(() => Department, department => department.books)
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @OneToMany(() => Download, download => download.book)
  downloads: Download[];
}
