import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToast, IonToolbar } from '@ionic/angular/standalone';
import { WorkoutService } from "../../../services/workout/workout.service";
import { Workout, Workouts } from "../../../models/workout";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { addIcons } from "ionicons";
import { save, checkbox } from "ionicons/icons";

// ==============================================


@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.page.html',
  styleUrls: ['./workout-edit.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonBackButton, IonButtons, IonButton, IonFooter, IonIcon, IonInput, IonItem, IonList, RouterLink, IonToast]
})
export class WorkoutEditPage implements OnInit {
  protected workout !: Workout;
  private route = inject(ActivatedRoute);
  private workoutService: WorkoutService = inject(WorkoutService);

  public constructor() {
    addIcons({save, checkbox});
  }

  public async ngOnInit() {
    const workoutId: number = parseInt(this.route.snapshot.paramMap.get('id') || '0');
    const workouts: Workouts = await this.workoutService.getWorkouts();
    this.workout = await this.workoutService.getWorkout(workoutId) || workouts[0];
  }

  public async saveModifications(): Promise<void> {
    if(this.workout) {
      await this.workoutService.setWorkout(this.workout.id, this.workout);
    }
  }

}
