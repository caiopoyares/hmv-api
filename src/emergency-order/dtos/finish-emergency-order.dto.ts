import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class FinishEmergencyOrderDto {
  @IsNotEmpty()
  @IsString()
  finishDate: string;

  @IsNotEmpty()
  @IsString()
  finishTime: string;

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
