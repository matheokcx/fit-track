import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonBackButton,
    IonButton, IonButtons,
    IonCheckbox,
    IonCol,
    IonContent,
    IonDatetime,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonRange,
    IonReorder,
    IonReorderGroup,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonText,
    IonTitle,
    IonToast,
    IonToolbar
} from '@ionic/angular/standalone';
import { add, checkbox, happyOutline, sadOutline, searchOutline } from "ionicons/icons";
import { addIcons } from "ionicons";
import { WorkoutPattern } from "../../../models/workoutPattern";
import { feelings, Workout, Workouts } from "../../../models/workout";
import { RouterLink } from "@angular/router";
import { WorkoutService } from "../../../services/workout/workout.service";
import { WorkoutPatternService } from "../../../services/pattern/workout-pattern.service";
import { Subscription } from "rxjs";
import { Exercise, BODY_WEIGHT_EXERCISES } from "../../../models/exercise";
import { ItemReorderEventDetail } from "@ionic/angular";

// ==============================================


@Component({
  selector: 'app-workout-add',
  templateUrl: './workout-add.page.html',
  styleUrls: ['./workout-add.page.scss'],
  standalone: true,
    imports: [IonContent, CommonModule, FormsModule, IonSelect, IonDatetime, IonRange, IonIcon, IonGrid, IonRow, IonCol, IonText, IonSelectOption, IonButton, RouterLink, IonHeader, IonTitle, IonToolbar, IonItem, IonCheckbox, IonInput, IonList, IonFooter, IonLabel, IonReorderGroup, IonReorder, IonToast, IonBackButton, IonButtons]
})
export class WorkoutAddPage implements OnInit {
  protected workoutPatternsList: WorkoutPattern[] = [];
  protected exerciseInputs: {
    [exerciseName: string]: {
      checked: boolean;
      weight: number;
    };
  } = {};
  protected _pattern !: WorkoutPattern;
  protected startHour: number = 0;
  protected endHour: number = 0;
  protected feeling: number = 1;
  protected observation: string = "";

  private workoutService: WorkoutService = inject(WorkoutService);
  private workoutPatternService: WorkoutPatternService = inject(WorkoutPatternService);
  private sub = new Subscription();

  public constructor() {
    addIcons({sadOutline, happyOutline, searchOutline, add, checkbox});
  }

  async ngOnInit() {
    this.loadWorkoutPatterns();
    this.sub.add(
      this.workoutPatternService.onWorkoutPatternsChange().subscribe(() => {
        this.loadWorkoutPatterns();
      })
    );
  }

  protected async loadWorkoutPatterns(): Promise<void> {
    this.workoutPatternsList = await this.workoutPatternService.getWorkoutPatterns();
  }

  get pattern(): WorkoutPattern {
    return this._pattern;
  }

  set pattern(value: WorkoutPattern) {
    this._pattern = value;
    this.exerciseInputs = {};

    value.exercises?.forEach(ex => {
      this.exerciseInputs[ex.name] = {
        checked: false,
        weight: 0
      };
    });
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

  protected isWithoutWeight= (exercise: Exercise): boolean => BODY_WEIGHT_EXERCISES.includes(exercise.name);

  protected handleReorderExercises(event: CustomEvent<ItemReorderEventDetail>): void {
    const beforePosition = event.detail.from;
    const afterPosition = event.detail.to;

    const movedItem = this._pattern.exercises.splice(beforePosition, 1)[0];
    this._pattern.exercises.splice(afterPosition, 0, movedItem);

    event.detail.complete();
  }

  protected async addWorkout(): Promise<void> {
    const workouts: Workouts = await this.workoutService.getWorkouts();
    const startTime = new Date(this.startHour);
    const endTime = new Date(this.endHour);

    const startFormatted = `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`;
    const endFormatted = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;

    const newWorkout: Workout = {
      id: workouts[workouts.length - 1]?.id + 1 || 0,
      pattern: this.pattern,
      startingHour: startFormatted,
      endHour: endFormatted,
      finishedExercise: this.pattern.exercises
        .filter(ex => this.exerciseInputs[ex.name]?.checked)
        .map(ex => ({
          exercise: ex,
          maxWeight: this.exerciseInputs[ex.name].weight || null
        })),
      feeling: this.translateFeelingScore(),
      observation: this.observation !== "" ? this.observation : null
    };

    await this.workoutService.addWorkout(newWorkout);
  }

}
