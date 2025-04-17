import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonLabel, IonList, IonListHeader, IonTitle, IonToolbar, IonIcon, IonFooter, IonAlert, IonItem} from '@ionic/angular/standalone';
import { WorkoutItemComponent } from "../../components/workout-item/workout-item.component";
import { Workout, Workouts } from "../../../models/workout";
import { addIcons } from "ionicons";
import { trash } from "ionicons/icons";
import { Subscription } from "rxjs";
import { WorkoutService } from "../../../services/workout/workout.service";
import { WorkoutPatternService } from "../../../services/pattern/workout-pattern.service";
import { RouterLink } from "@angular/router";

// ==============================================


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonLabel, IonList, IonListHeader, WorkoutItemComponent, IonToolbar, IonHeader, IonTitle, IonButton, IonIcon, IonFooter, IonAlert, IonItem, RouterLink]
})
export class DashboardPage implements OnInit, OnDestroy {
  protected lastWorkouts: Workout[] = [];
  protected alertButtons = [
    {
      text: 'Annuler',
      role: 'cancel'
    },
    {
      text: 'Valider',
      role: 'confirm',
      handler: async () => {
        await this.resetDatas();
      }
    }
  ];
  protected workoutService: WorkoutService = inject(WorkoutService);
  protected workoutPatternService: WorkoutPatternService = inject(WorkoutPatternService);
  private sub = new Subscription();

  public constructor() {
    addIcons({trash});
  }

  private async loadWorkouts() {
    const workouts: Workouts = await this.workoutService.getWorkouts();
    this.lastWorkouts = (workouts?.slice(-5, workouts.length)).reverse();
  }

  async ngOnInit() {
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

  protected async resetDatas(): Promise<void> {
    await this.workoutService.removeAllWorkouts();
    await this.workoutPatternService.removeAllWorkoutPatterns();
  }

}
