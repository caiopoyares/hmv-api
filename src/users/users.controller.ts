import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Roles(Role.Patient, Role.Attendant)
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
