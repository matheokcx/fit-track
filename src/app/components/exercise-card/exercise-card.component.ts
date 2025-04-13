import { Component, inject, Input, OnInit } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonIcon, IonList, IonText } from "@ionic/angular/standalone";
import { FinishedExercise, Workout, Workouts } from "../../../models/workout";
import { WorkoutService } from "../../../services/workout/workout.service";
import { ExerciseProgressionManagePipe } from "../../../pipes/exercise-progression-manage/exercise-progression-manage.pipe";

// ==============================================


@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss'],
  imports: [IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonIcon, IonList, IonText, ExerciseProgressionManagePipe]
})
export class ExerciseCardComponent implements OnInit {
  @Input() exercise !: FinishedExercise;
  @Input() currentWorkout !: Workout;
  protected progression: number = 0;
  private workoutService : WorkoutService = inject(WorkoutService);

  async ngOnInit() {
    this.progression = await this.getAdvancementsFromlastTime();
  }

  protected async getAdvancementsFromlastTime(): Promise<number> {
    const allWorkouts: Workouts = await this.workoutService.getWorkouts();
    const workoutIndex: number = allWorkouts.findIndex(workout => workout.id === this.currentWorkout.id);

    const workoutsBeforeCurrent: Workouts = allWorkouts.filter((workout: Workout) =>
      workout.id < workoutIndex && workout.finishedExercise.some(exercise =>
        exercise.exercise.name === this.exercise.exercise.name));

    const lastBeforeWorkout: Workout | null = workoutIndex > 0 ? workoutsBeforeCurrent.slice(-1)[0] : null;

    if(lastBeforeWorkout === null) return 0;

    const lastTimeExercise: FinishedExercise | undefined = lastBeforeWorkout?.finishedExercise.find((exercise: FinishedExercise) =>
      exercise.exercise.name === this.exercise.exercise.name);

    if(!lastTimeExercise?.maxWeight || !this.exercise.maxWeight) return 0;

    if(lastTimeExercise?.maxWeight === this.exercise.maxWeight) {
      return 0;
    }
    else if (lastTimeExercise?.maxWeight > this.exercise.maxWeight){
      return -1;
    }
    else{
      return 1;
    }
  }

  protected readonly Array = Array;

}
