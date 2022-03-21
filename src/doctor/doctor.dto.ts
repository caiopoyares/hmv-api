import {
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class CreateDoctorDto {  
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

  export class UpdateDoctorDto {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    area: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    speciality: string;
  
    @IsNotEmpty()
    @IsNumberString()
    @MinLength(10)
    @MaxLength(13)
    @IsOptional()
    phone: string;
  }
  