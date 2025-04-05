import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonContent, IonHeader, IonLabel, IonList,
  IonListHeader, IonText, IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import { ActivatedRoute } from "@angular/router";
import { Workout } from "../../../models/workout";
import { StorageService } from "../../../services/storage/storage.service";


@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.page.html',
  styleUrls: ['./workout-details.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule,
    IonListHeader, IonLabel, IonList,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonButtons, IonBackButton
  ]
})
export class WorkoutDetailsPage implements OnInit {
  protected workoutID !: number;
  protected workout?: Workout;

  private route = inject(ActivatedRoute);
  private storageService = inject(StorageService);

  async ngOnInit(): Promise<void> {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.workoutID = Number(idParam);

    if (isNaN(this.workoutID)) {
      console.warn('Invalid workout ID:', idParam);
      return;
    }

    try {
      const workouts: Workout[] = await this.storageService.get('workouts');
      this.workout = workouts.find(w => w.id === this.workoutID);

      if (!this.workout) {
        console.warn(`Workout with ID ${this.workoutID} not found.`);
      }
    } catch (error) {
      console.error('Error loading workouts from storage:', error);
    }
  }
}
