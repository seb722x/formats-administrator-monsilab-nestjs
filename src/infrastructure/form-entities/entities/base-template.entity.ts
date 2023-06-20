import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class BaseTemplate {

    @PrimaryColumn()
    id: string;

    @Column('text', {
        unique: true,
    })
    Lote: string;

    @Column('text',{
        default: "0000/00/00"
    })
    Date: Date;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

   

       


}