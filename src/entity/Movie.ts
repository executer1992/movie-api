import { Ratings } from './Ratings';
import { Country } from './Country';
import { Actor } from './Actor';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany,
    JoinTable,
    Unique
  } from "typeorm";
import { Writer } from "./Writer";

@Entity()
@Unique(['id', 'title'])
export class Movie {

    @PrimaryGeneratedColumn("uuid")
    public id?: string;

    @Column()
    public title!: string;

    @Column()
    public year!: string;

    @Column()
    public rated!: string;

    @Column()
    public released!: string;

    @Column()
    public runtime!: string;

    @Column()
    public genre!: string;

    @Column()
    public director!: string;

    @ManyToMany(() => Writer, {cascade: true})
    @JoinTable()
    public writer!: Writer[];

    @ManyToMany(() => Actor, {cascade: true})
    @JoinTable()
    public actors!: Actor[];

    @Column()
    public plot!: string;

    @Column()
    public language!: string;

    @ManyToMany(() => Country, {cascade: true})
    @JoinTable()
    public country!: Country[];

    @Column()
    public awards!: string;

    @Column()
    public poster!: string;

    @OneToMany(() => Ratings, (ratings: Ratings) => ratings.movie, {cascade: true})
    public ratings!: Ratings[];

    @Column()
    public metascore!: string;

    @Column()
    public imdbRating!: string;

    @Column()
    public imdbVotes!: string;

    @Column()
    public imdbID!: string;

    @Column()
    public type!: string;

    @Column()
    public dvd!: string;

    @Column()
    public boxOffice!: string;

    @Column()
    public production!: string;

    @Column()
    public website!: string;

}

