import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../users/users.entity';

export class CreateEmergencyInfoDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  user: User;

  @IsNotEmpty()
  @IsString()
  allergies: string;

  @IsNotEmpty()
  @IsString()
  regularDrugs: string;

  @IsNotEmpty()
  @IsString()
  chronicDiseases: string;
}

export class UpdateEmergencyInfoDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  allergies: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  regularDrugs: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  chronicDiseases: string;
}
