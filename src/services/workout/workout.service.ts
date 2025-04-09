import { inject, Injectable } from '@angular/core';
import { StorageService } from "../storage/storage.service";
import { Workout, Workouts } from "../../models/workout";

// ==============================================


@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private storageService: StorageService = inject(StorageService);

  public async getWorkouts(): Promise<Workouts> {
    return await this.storageService.get("workouts") || [];
  }

  async getWorkout(id:number): Promise<Workout | undefined> {
    const workouts: Workouts = await this.getWorkouts();
    return workouts.find(workout => workout.id === id);
  }

  async addWorkout(workout: Workout): Promise<void> {
    const workouts: Workouts = await this.getWorkouts();
    workouts.push(workout);
    await this.storageService.set("workouts", workouts);
  }

}
