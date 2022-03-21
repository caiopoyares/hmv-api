import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EmergencyInfo{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({name: 'userId'})
    user: User;

    @Column()
    allergies: string;

    @Column()
    regularDrugs: string;
    
    @Column()
    chronicDiseases: string;

}