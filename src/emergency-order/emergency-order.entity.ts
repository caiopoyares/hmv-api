import { IsString } from 'class-validator';
import { Doctor } from 'src/doctor/doctor.entity';
import { Hospital } from 'src/hospital/hospital.entity';
import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EmergencyOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.emergencyOrders)
  user: User;

  @ManyToOne(() => Hospital, (hospital) => hospital.emergencyOrders)
  hospital: Hospital;

  @ManyToOne(() => Doctor, (doctor) => doctor.emergencyOrders)
  doctor: Doctor;

  @Column()
  @IsString()
  arrivalDate: string;

  @Column()
  @IsString()
  arrivalTime: string;

  @Column({ nullable: true })
  @IsString()
  finishDate: string;

  @Column()
  @IsString()
  reason: string;

  @Column()
  @IsString()
  details: string;

  @Column({ nullable: true })
  @IsString()
  suggestions: string;

  @Column({ nullable: true })
  @IsString()
  returnAfter: string;
}
