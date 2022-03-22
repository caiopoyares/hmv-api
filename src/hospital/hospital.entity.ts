import { EmergencyOrder } from '../emergency-order/emergency-order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Hospital {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  telephone: string;

  @OneToMany(() => EmergencyOrder, (emergencyOrder) => emergencyOrder.hospital)
  emergencyOrders: EmergencyOrder[];
}
