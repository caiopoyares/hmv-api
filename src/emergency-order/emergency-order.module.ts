import { Module } from '@nestjs/common';
import { EmergencyOrderService } from './emergency-order.service';
import { EmergencyOrderController } from './emergency-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyOrder } from './emergency-order.entity';
import { User } from '../users/users.entity';
import { Hospital } from '../hospital/hospital.entity';
import { UsersModule } from '../users/users.module';
import { Doctor } from '../doctor/doctor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmergencyOrder, User, Hospital, Doctor]),
    UsersModule,
  ],
  providers: [EmergencyOrderService],
  controllers: [EmergencyOrderController],
})
export class EmergencyOrderModule {}
