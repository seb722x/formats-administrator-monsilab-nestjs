
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';

@Entity("templates")
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('json')
  fields: Record<string, any>;
  
  @Column('json', { nullable: true })
  relations: Record<string, any>[];

}