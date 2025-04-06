import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonIcon,
  IonRange,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText
} from '@ionic/angular/standalone';
import {add, happyOutline, sadOutline, searchOutline} from "ionicons/icons";
import {addIcons} from "ionicons";
import {Pattern} from "../../../models/pattern";
import {StorageService} from "../../../services/storage/storage.service";
import {feelings, Workout, Workouts} from "../../../models/workout";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-workout-add',
  templateUrl: './workout-add.page.html',
  styleUrls: ['./workout-add.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonSelect, IonDatetime, IonRange, IonIcon, IonGrid, IonRow, IonCol, IonText, IonSelectOption, IonButton, RouterLink]
})
export class WorkoutAddPage implements OnInit {
  protected patternsList: Pattern[] = [];
  private storageService: StorageService = inject(StorageService);

  // Datas
  protected pattern !: Pattern;
  protected startHour: number = new Date().getHours();
  protected endHour: number = new Date().getHours();
  protected feeling: number = 2;

  constructor() {
    addIcons({sadOutline, happyOutline, searchOutline, add});
  }

  async ngOnInit() {
    this.patternsList = await this.storageService.get("patterns");
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

  async addWorkout(){
    const workouts = await this.storageService.get("workouts");
    const newWorkout: Workout = {
      id: workouts[workouts.length - 1].id + 1 || 0,
      pattern : this.pattern,
      startHour: new Date(this.startHour).toDateString(),
      endHour: new Date(this.endHour).toDateString(),
      feeling: this.translateFeelingScore()
    }
    const newWorkouts: Workouts = workouts.concat(newWorkout);
    await this.storageService.set("workouts", newWorkouts);
  }

}
