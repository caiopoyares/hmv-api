import { Injectable } from "@nestjs/common";

import { HabitDTO } from "./habit.dto";

@Injectable()
export class HabitService {
  private habits: HabitDTO[] = [];

  insertHabit(userId: string, description: string) {
    const habitId = Math.random().toString();
    const newHabit = new HabitDTO();
    this.habits.push(newHabit);
    return habitId;
  }

  getHabits() {
        return [...this.habits];
  }

}