
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, TableUniqueOptions } from 'typeorm';

@Entity("templates")
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text',{
      unique:true,
  })
  name: string;

  @Column('json')
  columns: Record<string, any>;
  
  @Column('json', { nullable: true })
  relations: Record<string, any>[];

}