import { Module } from '@nestjs/common';
import { EmergencyOrderService } from './emergency-order.service';
import { EmergencyOrderController } from './emergency-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyOrder } from './emergency-order.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmergencyOrder, User])],
  providers: [EmergencyOrderService],
  controllers: [EmergencyOrderController],
})
export class EmergencyOrderModule {}
