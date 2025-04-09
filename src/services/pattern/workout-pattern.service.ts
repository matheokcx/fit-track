import { inject, Injectable } from '@angular/core';
import { StorageService } from "../storage/storage.service";
import { WorkoutPattern, WorkoutPatterns } from "../../models/workoutPattern";

// ==============================================


@Injectable({
  providedIn: 'root'
})
export class WorkoutPatternService {
  private storageService: StorageService = inject(StorageService);

  async getWorkoutPatterns(): Promise<WorkoutPatterns> {
    return await this.storageService.get("workoutPatterns") || [];
  }

  protected async getWorkoutPattern(id:number): Promise<WorkoutPattern | undefined> {
    const workoutPatterns: WorkoutPatterns = await this.getWorkoutPatterns();
    return workoutPatterns.find(workoutPattern => workoutPattern.id === id);
  }

  async addWorkoutPattern(workoutPattern: WorkoutPattern): Promise<void> {
    const workoutPatterns: WorkoutPatterns = await this.getWorkoutPatterns();
    workoutPatterns.push(workoutPattern);
    await this.storageService.set("workoutPatterns", workoutPatterns);
  }

}
