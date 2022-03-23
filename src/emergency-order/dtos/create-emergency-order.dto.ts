import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEmergencyOrderDto {
  @IsNotEmpty()
  @IsString()
  patientFirstName: string;

  @IsNotEmpty()
  @IsString()
  patientLastName: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(11)
  @MaxLength(11)
  patientCPF: string;

  @IsNotEmpty()
  @IsEmail()
  patientEmail: string;

  @IsNotEmpty()
  @IsNumberString()
  patientAge: string;

  @IsNotEmpty()
  @IsNumberString()
  hospitalId: string;

  @IsNotEmpty()
  @IsString()
  arrivalDate: string;

  @IsNotEmpty()
  @IsString()
  arrivalTime: string;

  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
