import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonLabel, IonList, IonListHeader, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from "@angular/router";
import { Workout } from "../../../models/workout";
import { WorkoutService } from "../../../services/workout/workout.service";

// ==============================================


@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.page.html',
  styleUrls: ['./workout-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonListHeader, IonLabel, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonButtons, IonBackButton]
})
export class WorkoutDetailsPage implements OnInit {
  protected workout?: Workout;
  private route = inject(ActivatedRoute);
  private workoutService: WorkoutService = inject(WorkoutService);

  async ngOnInit(): Promise<void> {
    const idWorkout: number = parseInt(this.route.snapshot.paramMap.get('id') || '0') ;
    this.workout = await this.workoutService.getWorkout(idWorkout);
  }

}
