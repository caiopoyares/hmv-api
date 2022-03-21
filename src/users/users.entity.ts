import { EmergencyInfo } from 'src/emergencyInfo/emergencyInfo.entity';
import { Role } from 'src/enums/roles.enum';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  type: Role;

  @Column({ unique: true })
  cpf: string;

  @Column()
  birthDate: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: true })
  password: string;

  @Column({ default: true })
  isActive: boolean;
  
  @OneToMany(type => EmergencyInfo, emergencyInfo => emergencyInfo.user)
  emergencyInfo : EmergencyInfo[]
}
