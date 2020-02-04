import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Language {
   @PrimaryGeneratedColumn('uuid')
   id!: string;

   @Column()
   public language!: string;
}
