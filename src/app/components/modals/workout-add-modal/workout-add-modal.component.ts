import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {IonButton, IonContent, IonIcon, IonSelect, IonSelectOption} from "@ionic/angular/standalone";
import { WorkoutPattern, WorkoutPatterns } from "../../../../models/workoutPattern";
import { addIcons } from "ionicons";
import { WorkoutPatternService } from "../../../../services/pattern/workout-pattern.service";
import { Subscription } from "rxjs";
import { WorkoutService } from "../../../../services/workout/workout.service";
import { Workout, Workouts } from "../../../../models/workout";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import {addCircle} from "ionicons/icons";

// ==============================================


@Component({
  selector: 'app-workout-add-modal',
  templateUrl: './workout-add-modal.component.html',
  styleUrls: ['./workout-add-modal.component.scss'],
  imports: [IonContent, IonSelect, IonButton, IonSelectOption, FormsModule, RouterLink, IonIcon]
})
export class WorkoutAddModalComponent  implements OnInit, OnDestroy {
  protected workoutPatterns: WorkoutPatterns = [];
  protected choosePattern !: WorkoutPattern;
  private workoutPatternService: WorkoutPatternService = inject(WorkoutPatternService);
  private workoutService: WorkoutService = inject(WorkoutService);
  private sub: Subscription = new Subscription();

  public constructor(){
    addIcons({addCircle});
  }

  public async ngOnInit(): Promise<void> {
    await this.loadWorkoutPatterns();
    this.sub.add(this.workoutPatternService.onWorkoutPatternsChange().subscribe(
      () => this.loadWorkoutPatterns())
    );
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private async loadWorkoutPatterns(): Promise<void> {
    this.workoutPatterns = await this.workoutPatternService.getWorkoutPatterns();
  }

  protected async addWorkout(): Promise<void> {
    const workouts: Workouts = await this.workoutService.getWorkouts();
    const newID: number =  workouts[workouts.length - 1]?.id + 1 || 0;
    const newWorkout: Workout = {
      id: newID,
      pattern: this.choosePattern,
      startingHour: null,
      endHour: null,
      finishedExercise: [],
      feeling: null,
      observation: null
    };
    await this.workoutService.addWorkout(newWorkout);
  }

}
