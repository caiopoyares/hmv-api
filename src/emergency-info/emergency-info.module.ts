import { Module } from '@nestjs/common';
import { EmergencyInfoService } from './emergency-info.service';
import { EmergencyInfoController } from './emergency-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyInfo } from './emergency-info.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmergencyInfo]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [EmergencyInfoService, UsersService],
  exports: [EmergencyInfoService],
  controllers: [EmergencyInfoController],
})
export class EmergencyInfoModule {}
