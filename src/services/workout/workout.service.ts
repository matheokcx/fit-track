import { inject, Injectable } from '@angular/core';
import { StorageService } from "../storage/storage.service";
import { Workout, Workouts } from "../../models/workout";
import {BehaviorSubject} from "rxjs";
import {WorkoutPatterns} from "../../models/workoutPattern";

// ==============================================


@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workoutsChanged$ = new BehaviorSubject<void>(undefined);
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
    this.workoutsChanged$.next();
  }

  async removeWorkout(id:number): Promise<void> {
    const workouts: Workouts = await this.getWorkouts();
    workouts.splice(id, 1);
    await this.storageService.set("workouts", workouts);
    this.workoutsChanged$.next();
  }

  async removeAllWorkouts(): Promise<void> {
    await this.storageService.set("workouts", []);
    this.workoutsChanged$.next();
  }

  onWorkoutsChange() {
    return this.workoutsChanged$.asObservable();
  }

}
