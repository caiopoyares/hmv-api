import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/roles.enum';
import { CreateHospitalDto } from './hospital.dto';
import { HospitalService } from './hospital.service';

@Controller('hospital')
export class HospitalController {
  constructor(private hospitalService: HospitalService) {}
  @Get()
  getHospitals() {
    return this.hospitalService.findAll();
  }

  @Get(':id')
  getHospital(@Param('id') id: string) {
    return this.hospitalService.findOne(id);
  }

  @Roles(Role.Attendant)
  @Post()
  addHospital(@Body() createHospitalDto: CreateHospitalDto) {
    return this.hospitalService.add(createHospitalDto);
  }

  @Roles(Role.Attendant)
  @Put(":id")
  updateHospital(@Param('id') id: string, @Body() createHospitalDto: CreateHospitalDto) {
    return this.hospitalService.update(id, createHospitalDto);
  }

  @Roles(Role.Attendant)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.hospitalService.remove(id);
  }
  
}
