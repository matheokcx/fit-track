import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList, IonReorder, IonReorderGroup,
  IonTitle,
  IonToast,
  IonToolbar
} from '@ionic/angular/standalone';
import { WorkoutService } from "../../../services/workout/workout.service";
import {feelings, FinishedExercise, Workout, Workouts} from "../../../models/workout";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { addIcons } from "ionicons";
import { save, checkbox } from "ionicons/icons";
import {BODY_WEIGHT_EXERCISES, Exercise} from "../../../models/exercise";
import {ItemReorderEventDetail} from "@ionic/angular";
import {WorkoutPattern} from "../../../models/workoutPattern";
import {DatePickersComponent} from "../../components/date-pickers/date-pickers.component";
import {FeelingRangeComponent} from "../../components/feeling-range/feeling-range.component";

// ==============================================


@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.page.html',
  styleUrls: ['./workout-edit.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonBackButton, IonButtons, IonButton, IonFooter, IonIcon, IonInput, IonItem, IonList, RouterLink, IonToast, IonCheckbox, IonReorderGroup, IonReorder, DatePickersComponent, FeelingRangeComponent]
})
export class WorkoutEditPage implements OnInit {
  protected workout !: Workout;
  protected _pattern !: WorkoutPattern;
  protected exerciseInputs: {
    [exerciseName: string]: {
      checked: boolean;
      weight: number;
    };
  } = {};
  protected startHour: number = 0;
  protected endHour: number = 0;
  protected feeling: number = 1;
  protected observation: string = "";
  private route = inject(ActivatedRoute);
  private workoutService: WorkoutService = inject(WorkoutService);

  public constructor() {
    addIcons({save, checkbox});
  }

  public async ngOnInit(): Promise<void> {
    const workoutId: number = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    const workouts: Workouts = await this.workoutService.getWorkouts();
    this.workout = await this.workoutService.getWorkout(workoutId) || workouts[0];
    if(this.workout?.pattern) {
      this.pattern = this.workout.pattern;
    }
  }

  public async saveModifications(): Promise<void> {
    if(this.workout) {
      await this.workoutService.setWorkout(this.workout.id, this.workout);
    }
  }

  get pattern(): WorkoutPattern {
    return this._pattern;
  }

  set pattern(value: WorkoutPattern) {
    this._pattern = value;
    this.exerciseInputs = {};

    value.exercises?.forEach(ex => {
      this.exerciseInputs[ex.name] = {
        checked: this.didExercise(ex),
        weight: this.didExercise(ex) ? this.retrieveExerciseWeightFromFinishedExercises(ex) || 0 : 0
      };
    });
  }

  public didExercise(exercise: Exercise): boolean {
    return this.workout.finishedExercise.filter(
      (finishedExercise: FinishedExercise) => finishedExercise.exercise.name.localeCompare(exercise.name) == 0).length > 0;
  }

  public retrieveExerciseWeightFromFinishedExercises(exercise: Exercise): number | null {
    return this.workout.finishedExercise.filter(
      (finishedExercise: FinishedExercise) => finishedExercise.exercise.name.localeCompare(exercise.name) == 0)[0].maxWeight;
  }

  protected isWithoutWeight= (exercise: Exercise): boolean => BODY_WEIGHT_EXERCISES.includes(exercise.name);

  protected handleReorderExercises(event: CustomEvent<ItemReorderEventDetail>): void {
    const beforePosition = event.detail.from;
    const afterPosition = event.detail.to;

    const movedItem = this._pattern.exercises.splice(beforePosition, 1)[0];
    this._pattern.exercises.splice(afterPosition, 0, movedItem);

    event.detail.complete();
  }

  private translateFeelingScore(){
    if(this.feeling === 0){
      return feelings.BAD;
    }
    else if(this.feeling === 1){
      return feelings.MIDDLE;
    }
    else{
      return feelings.GOOD;
    }
  }

  public async editWorkout(){
    const startTime = new Date(this.startHour);
    const endTime = new Date(this.endHour);
    const startFormatted = `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`;
    const endFormatted = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;

    const newWorkoutVersion: Workout = {
      id: this.workout.id,
      pattern: this.workout.pattern,
      startingHour: startFormatted,
      endHour: endFormatted,
      finishedExercise: this.pattern.exercises
        .filter(exercise => this.exerciseInputs[exercise.name]?.checked)
        .map(exercise => ({
          exercise: exercise,
          maxWeight: this.exerciseInputs[exercise.name].weight || null
        })),
      feeling: this.translateFeelingScore(),
      observation: this.observation,
    };

    await this.workoutService.setWorkout(this.workout.id, newWorkoutVersion);
  }

}
