import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, Column } from 'typeorm';

@Entity()
export class Actor {
   @PrimaryGeneratedColumn('uuid')
   id!: string;

   @Column()
   public name!: string;
}
