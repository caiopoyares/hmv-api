import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';

export class HabitDTO {

        @IsNotEmpty()
        @IsString()
        public id: number;

        @IsNotEmpty()
        @IsString()
        public userId: string;

        @IsNotEmpty()
        @IsNumberString()
        public description: string;
    }