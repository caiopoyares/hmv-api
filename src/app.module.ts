import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmergencyOrderModule } from './emergOrder/emergOrder.module';
import { HabitModule } from './habit/habit.module';

@Module({
  imports: [
    EmergencyOrderModule,
    HabitModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
