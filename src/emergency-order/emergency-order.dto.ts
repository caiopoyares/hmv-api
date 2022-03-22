import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEmergencyOrderDto {
  @IsNotEmpty()
  @IsString()
  pacientFirstName: string;

  @IsNotEmpty()
  @IsString()
  pacientLastName: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(11)
  @MaxLength(11)
  pacientCPF: string;

  @IsNotEmpty()
  @IsEmail()
  pacientEmail: string;

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
