import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/roles.enum';
import { CreateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // @Roles(Role.Patient, Role.Attendant)
  // at least for now, this endpoint will be public, but we must lock it before going production
  @Public()
  @Post()
  addUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.add(createUserDto);
  }

  @Roles(Role.Attendant)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
