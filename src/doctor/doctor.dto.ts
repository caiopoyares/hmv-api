import {
    IsNotEmpty,
    IsNumberString,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class CreateDoctorDto {
    constructor(){
    }
  
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    area: string;

    @IsNotEmpty()
    @IsString()
    speciality: string;
  
    @IsNotEmpty()
    @IsNumberString()
    @MinLength(10)
    @MaxLength(13)
    phone: string;
  }
  