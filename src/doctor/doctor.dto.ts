import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  crm: number;

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
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  crm: number;

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
