import { EmergencyOrder } from 'src/emergency-order/emergency-order.entity';
import { EmergencyInfo } from 'src/emergencyInfo/emergencyInfo.entity';
import { Role } from 'src/enums/roles.enum';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @Column({ nullable: true })
  birthDate: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: true })
  password: string;

  @OneToMany(() => EmergencyInfo, (emergencyInfo) => emergencyInfo.user)
  emergencyInfo: EmergencyInfo[];

  @OneToMany(() => EmergencyOrder, (emergencyOrder) => emergencyOrder.user)
  emergencyOrders: EmergencyOrder[];
}
