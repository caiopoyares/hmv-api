import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Habit {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    description: string;

    @Column()
    habitScore: number;

}