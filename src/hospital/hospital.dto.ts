import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateHospitalDto {
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

export class UpdateHospitalDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  address: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(10)
  @MaxLength(13)
  @IsOptional()
  telephone: string;
}
