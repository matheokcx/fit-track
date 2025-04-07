import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCheckbox,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonIcon, IonInput,
  IonItem,
  IonRange,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { add, happyOutline, sadOutline, searchOutline } from "ionicons/icons";
import { addIcons } from "ionicons";
import { WorkoutPattern } from "../../../models/workoutPattern";
import { StorageService } from "../../../services/storage/storage.service";
import { feelings, Workout, Workouts } from "../../../models/workout";
import { RouterLink } from "@angular/router";
import {WorkoutService} from "../../../services/workout/workout.service";
import {WorkoutPatternService} from "../../../services/pattern/workout-pattern.service";

// ==============================================


@Component({
  selector: 'app-workout-add',
  templateUrl: './workout-add.page.html',
  styleUrls: ['./workout-add.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonSelect, IonDatetime, IonRange, IonIcon, IonGrid, IonRow, IonCol, IonText, IonSelectOption, IonButton, RouterLink, IonHeader, IonTitle, IonToolbar, IonItem, IonCheckbox, IonInput]
})
export class WorkoutAddPage implements OnInit {
  protected workoutPatternsList: WorkoutPattern[] = [];
  private workoutService: WorkoutService = inject(WorkoutService);
  private workoutPatternService: WorkoutPatternService = inject(WorkoutPatternService);

  protected pattern !: WorkoutPattern;
  protected startHour: number = 0;
  protected endHour: number = 0;
  protected feeling: number = 2;

  constructor() {
    addIcons({sadOutline, happyOutline, searchOutline, add});
  }

  async ngOnInit() {
    this.workoutPatternsList = await this.workoutPatternService.getWorkoutPatterns();
  }

  private translateFeelingScore(){
    if(this.feeling === 0){
      return feelings.BAD;
    }
    else if(this.feeling === 1){
      return feelings.MIDDLE;
    }
    else if(this.feeling === 2){
      return feelings.GOOD;
    }
    else{
      return feelings.VERY_GOOD;
    }
  }

  async addWorkout() {
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
      finishedExercise: [],
      feeling: this.translateFeelingScore(),
      observation: null
    };

    await this.workoutService.addWorkout(newWorkout)
  }

}
