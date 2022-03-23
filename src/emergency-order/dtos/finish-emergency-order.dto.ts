import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FinishEmergencyOrderDto {
  @IsNotEmpty()
  @IsString()
  finishDate: string;

  @IsNotEmpty()
  @IsNumber()
  doctorId: number;

  @IsNotEmpty()
  @IsString()
  suggestions: string;

  @IsNotEmpty()
  @IsString()
  returnAfter: string;
}
