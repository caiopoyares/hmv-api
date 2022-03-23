import { Module } from '@nestjs/common';
import { EmergencyOrderService } from './emergency-order.service';
import { EmergencyOrderController } from './emergency-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyOrder } from './emergency-order.entity';
import { User } from 'src/users/users.entity';
import { Hospital } from 'src/hospital/hospital.entity';
import { UsersModule } from 'src/users/users.module';
import { Doctor } from 'src/doctor/doctor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmergencyOrder, User, Hospital, Doctor]),
    UsersModule,
  ],
  providers: [EmergencyOrderService],
  controllers: [EmergencyOrderController],
})
export class EmergencyOrderModule {}
