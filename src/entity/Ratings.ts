import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column
  } from "typeorm";
import { Movie } from "./Movie";
  
@Entity()
export class Ratings {

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column()
    public Source!: string;

    @Column()
    public Value!: string;

    @ManyToOne(() => Movie, (movie: Movie) => movie.ratings)
    public movie!: Movie;
}

