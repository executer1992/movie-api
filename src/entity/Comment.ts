import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Comment {
   @PrimaryGeneratedColumn('uuid')
   id!: string;

   @Column()
   public text!: string;

   @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
   public createDateTime!: Date;
}

