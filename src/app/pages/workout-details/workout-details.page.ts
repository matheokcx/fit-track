import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonList, IonListHeader, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from "@angular/router";
import { Workout } from "../../../models/workout";
import { WorkoutService } from "../../../services/workout/workout.service";
import { addIcons } from "ionicons";
import { flashOutline } from "ionicons/icons";
import { WorkoutFeelingIconPipe } from "../../../pipes/workout-feeling-icon/workout-feeling-icon.pipe";
import { WorkoutFeelingIconColorPipe } from "../../../pipes/workout-feeling-icon/workout-feeling-icon-color.pipe";
import { ExerciseCardComponent } from "../../components/exercise-card/exercise-card.component";

// ==============================================


@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.page.html',
  styleUrls: ['./workout-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonListHeader, IonLabel, IonList, IonText, IonButtons, IonBackButton, IonIcon, WorkoutFeelingIconPipe, WorkoutFeelingIconColorPipe, ExerciseCardComponent]
})
export class WorkoutDetailsPage implements OnInit {
  protected workout: Workout | undefined;
  private route = inject(ActivatedRoute);
  private workoutService: WorkoutService = inject(WorkoutService);

  public constructor() {
    addIcons({flashOutline});
  }

  async ngOnInit(): Promise<void> {
    const idWorkout: number = parseInt(this.route.snapshot.paramMap.get('id') || '0') ;
    this.workout = await this.workoutService.getWorkout(idWorkout);
  }

  public getFeeling(): string {
    return this.workout?.feeling || "GOOD";
  }

  public getCompletion(): string {
    return `(${this.workout?.finishedExercise.length}/${this.workout?.pattern.exercises.length} faits)`;
  }

  public getDuration(): string {
    if (this.workout) {
      let duration: number = parseInt(this.workout.endHour) - parseInt(this.workout.startingHour);
      if(duration < 0){
        duration += 24;
      }
      return duration.toString();
    }
    return "??";
  }

  protected readonly Array = Array;
}
