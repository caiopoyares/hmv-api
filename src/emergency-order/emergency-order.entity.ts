import { IsDate, IsNumber, IsNumberString, IsString } from 'class-validator';
import { Doctor } from 'src/doctor/doctor.entity';
import { EmergencyOrderStatus } from 'src/enums/emergency-order-status.enum';
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

  @Column({ nullable: true })
  @IsDate()
  arrivalDate: Date;

  @Column({ nullable: true })
  @IsDate()
  finishDate: Date;

  @Column()
  @IsString()
  reason: string;

  @Column({ type: 'text' })
  @IsString()
  description: string;

  @Column({ nullable: true })
  @IsString()
  suggestions: string;

  @Column({ nullable: true })
  @IsNumber()
  weeksUntilReturn: number;

  @Column()
  status: EmergencyOrderStatus;
}
