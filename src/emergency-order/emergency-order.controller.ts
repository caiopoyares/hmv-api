import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Role } from '../enums/roles.enum';
import { Roles } from '../decorators/roles.decorator';
import { CreateEmergencyOrderDto } from './emergency-order.dto';
import { EmergencyOrderService } from './emergency-order.service';

@Controller('emergency-orders')
export class EmergencyOrderController {
  constructor(private emergencyOrderService: EmergencyOrderService) {}

  @Get()
  getEmergencyOrders() {
    return this.emergencyOrderService.findAll();
  }

  @Get(':id')
  getEmergencyOrder(@Param('id') id: string) {
    return this.emergencyOrderService.findOne(id);
  }

  @Roles(Role.Attendant)
  @Post()
  addEmergencyOrder(@Body() createEmergencyOrderDto: CreateEmergencyOrderDto) {
    return this.emergencyOrderService.createEmergencyOrder(
      createEmergencyOrderDto,
    );
  }
}
