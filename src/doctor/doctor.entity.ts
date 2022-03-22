import { EmergencyOrder } from '../emergency-order/emergency-order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  crm: number;

  @Column()
  name: string;

  @Column()
  area: string;

  @Column()
  speciality: string;

  @Column()
  phone: string;

  @OneToMany(() => EmergencyOrder, (emergencyOrder) => emergencyOrder.doctor)
  emergencyOrders: EmergencyOrder[];
}
