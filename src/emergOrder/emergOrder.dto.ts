
import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';

export class EmergencyOrderDTO{

    @IsNotEmpty()
    @IsString()
    public id: string;

    @IsNotEmpty()
    @IsString()
    public pacientId: string;

    @IsNotEmpty()
    @IsString()
    public userId: string;

    @IsNotEmpty()
    @IsString()
    public hospitalId: string;
}