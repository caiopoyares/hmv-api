import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class FinishEmergencyOrderDto {
  @IsNotEmpty()
  @IsDateString()
  finishDate: Date;

  @IsNotEmpty()
  @IsNumberString()
  doctorId: string;

  @IsNotEmpty()
  @IsString()
  suggestions: string;

  @IsNotEmpty()
  @IsNumberString()
  weeksUntilReturn: string;
}
