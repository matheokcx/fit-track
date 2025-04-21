import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonList, IonListHeader, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from "@angular/router";
import { Workout, Workouts } from "../../../models/workout";
import { WorkoutService } from "../../../services/workout/workout.service";
import { addIcons } from "ionicons";
import { flashOutline } from "ionicons/icons";
import { WorkoutFeelingIconPipe } from "../../../pipes/workout-feeling-icon/workout-feeling-icon.pipe";
import { WorkoutFeelingIconColorPipe } from "../../../pipes/workout-feeling-icon/workout-feeling-icon-color.pipe";
import { ExerciseCardComponent } from "../../components/exercise-card/exercise-card.component";
import { Subscription } from "rxjs";

// ==============================================


@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.page.html',
  styleUrls: ['./workout-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonListHeader, IonLabel, IonList, IonText, IonButtons, IonBackButton, IonIcon, WorkoutFeelingIconPipe, WorkoutFeelingIconColorPipe, ExerciseCardComponent]
})
export class WorkoutDetailsPage implements OnInit {
  protected workout !: Workout;
  protected readonly Array = Array;
  private route = inject(ActivatedRoute);
  private workoutService: WorkoutService = inject(WorkoutService);
  private sub = new Subscription();

  public constructor() {
    addIcons({flashOutline});
  }

  async ngOnInit(): Promise<void> {
    const idWorkout: number = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    const workouts: Workouts = await this.workoutService.getWorkouts();
    this.workout = await this.workoutService.getWorkout(idWorkout) || workouts[0];
    this.sub.add(this.workoutService.onWorkoutsChange().subscribe(() => this.reloadWorkout()));
  }

  public async reloadWorkout(): Promise<void> {
    const workouts: Workouts = await this.workoutService.getWorkouts();
    this.workout = workouts[this.workout.id];
  }

  public getFeeling = (): string => this.workout?.feeling || "GOOD";

  public getCompletion = (): string => `(${this.workout?.finishedExercise.length}/${this.workout?.pattern.exercises.length} faits)`;

  public getDuration(): string {
    const endHour = this.workout?.endHour.split(":")[0];
    const endMinute = this.workout?.endHour.split(":")[1];
    const startingHour = this.workout?.startingHour.split(":")[0];
    const startingMinute = this.workout?.startingHour.split(":")[1];

    let duration: number = (parseInt(endHour)*60+(parseInt(endMinute)) - (parseInt(startingHour)*60 + parseInt(startingMinute)));
    if (duration < 0) duration += 1440;

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours}h${minutes}min`;
  }

}
