import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class EmergencyOrder {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    doctorId: number;

    @Column()
    hospitalId: number;

}