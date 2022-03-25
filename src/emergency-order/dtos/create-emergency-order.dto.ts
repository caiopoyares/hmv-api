import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
  IsDateString,
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
  @IsDateString()
  arrivalDate: Date;

  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
