import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Genre {
   @PrimaryGeneratedColumn('uuid')
   id!: string;

   @Column()
   public genre!: string;
}
