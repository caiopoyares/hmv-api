import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Role } from '../enums/roles.enum';
import { Roles } from '../decorators/roles.decorator';
import { CreateEmergencyOrderDto, FinishEmergencyOrderDto } from './dtos';
import { EmergencyOrderService } from './emergency-order.service';

@Controller('emergency-orders')
export class EmergencyOrderController {
  constructor(private emergencyOrderService: EmergencyOrderService) {}

  @Get()
  getAllEmergencyOrders() {
    return this.emergencyOrderService.findAll();
  }

  @Get('open')
  getOpenedEmergencyOrders() {
    return this.emergencyOrderService.findOpened();
  }

  @Get('closed')
  getClosedEmergencyOrders() {
    return this.emergencyOrderService.findClosed();
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

  @Roles(Role.Attendant)
  @Post(':id/finish')
  finishEmergencyOrder(
    @Param('id') id: string,
    @Body() finishEmergencyOrderDto: FinishEmergencyOrderDto,
  ) {
    return this.emergencyOrderService.finishEmergencyOrder(
      id,
      finishEmergencyOrderDto,
    );
  }
}
