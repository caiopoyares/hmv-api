import { 
    Body, 
    Controller, 
    Get, 
    Post 
} from "@nestjs/common";

import { HabitService } from "./habit.service";

@Controller('habitos')
export class HabitController{
    constructor(private readonly habitService: HabitService){}

    @Post()
    addHabit(
        @Body('userId') habitUserId: string,
        @Body('description') habitDescription: string,
        ){
            const generatedId = this.habitService.insertHabit(
                habitUserId, 
                habitDescription,
            );
            return { id: generatedId}
        }

    @Get()
    getAllHabits(){
        return this.habitService.getHabits();
    }
}