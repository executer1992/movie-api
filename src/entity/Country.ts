import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  
@Entity()
export class Country {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    public name!: string;

}