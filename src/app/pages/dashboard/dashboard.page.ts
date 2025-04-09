import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonLabel, IonList, IonListHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { WorkoutItemComponent } from "../../components/workout-item/workout-item.component";
import { Workout, Workouts } from "../../../models/workout";
import { addIcons } from "ionicons";
import { trendingDown, trendingUp } from "ionicons/icons";
import { Subscription } from "rxjs";
import {WorkoutService} from "../../../services/workout/workout.service";

// ==============================================


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonLabel, IonList, IonListHeader, WorkoutItemComponent, IonToolbar, IonHeader, IonTitle]
})
export class DashboardPage implements OnInit, OnDestroy {
  protected lastWorkouts: Workout[] = [];
  protected workoutService: WorkoutService = inject(WorkoutService);
  private sub = new Subscription();

  public constructor() {
    addIcons({trendingUp, trendingDown});
  }

  private async loadWorkouts() {
    const workouts: Workouts = await this.workoutService.getWorkouts()
    this.lastWorkouts = workouts?.slice(-5, workouts.length);
  }

  ngOnInit() {
    this.loadWorkouts();
    this.sub.add(
      this.workoutService.onWorkoutsChange().subscribe(() => {
        this.loadWorkouts();
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
