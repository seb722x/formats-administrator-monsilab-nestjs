import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GenericTable {

    @PrimaryColumn()
    id: string;

    @Column('text', {
        unique: true,
    })
    name: string;

}