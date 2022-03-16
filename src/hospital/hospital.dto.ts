import {
    IsNotEmpty,
    IsNumberString,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class CreateHospitalDto {
    constructor(){
    }
  
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    address: string;
  
    @IsNotEmpty()
    @IsNumberString()
    @MinLength(10)
    @MaxLength(13)
    telephone: string;
  }
  