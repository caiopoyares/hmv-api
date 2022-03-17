import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/roles.enum';
import { CreateDoctorDto } from './doctor.dto';
import { DoctorService } from './doctor.service';

@Controller('doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}
  @Get()
  getDoctors() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  getDoctor(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @Roles(Role.Attendant)
  @Post()
  addDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.add(createDoctorDto);
  }

  @Roles(Role.Attendant)
  @Put(":id")
  updateDoctor(@Param('id') id: string, @Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.update(id, createDoctorDto);
  }

  @Roles(Role.Attendant)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }
  
}
