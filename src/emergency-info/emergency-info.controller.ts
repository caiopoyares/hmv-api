import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { CreateEmergencyInfoDto } from './emergency-info.dto';
import { EmergencyInfoService } from './emergency-info.service';

@Controller('emergency-infos')
export class EmergencyInfoController {
  constructor(private emergencyInfoService: EmergencyInfoService) {}

  @Get()
  getEmergenciesInfo() {
    return this.emergencyInfoService.findAll();
  }

  @Get(':id')
  getEmergencyInfo(@Param('id') id: string) {
    return this.emergencyInfoService.findOne(id);
  }

  @Roles(Role.Attendant)
  @Post()
  addEmergencyInfo(@Body() createEmergencyInfoDto: CreateEmergencyInfoDto) {
    return this.emergencyInfoService.add(createEmergencyInfoDto);
  }

  @Roles(Role.Attendant)
  @Delete(':id')
  deleteEmergencyInfo(@Param('id') id: string) {
    return this.emergencyInfoService.remove(id);
  }
}
