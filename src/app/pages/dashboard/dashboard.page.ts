import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonLabel, IonList, IonListHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { WorkoutItemComponent } from "../../components/workout-item/workout-item.component";
import { Workout, Workouts } from "../../../models/workout";
import { StorageService } from "../../../services/storage/storage.service";
import { addIcons } from "ionicons";
import { trendingDown, trendingUp } from "ionicons/icons";
import { Subscription } from "rxjs";

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
  protected storageService: StorageService = inject(StorageService);
  private sub = new Subscription();

  public constructor() {
    addIcons({trendingUp, trendingDown});
  }

  private async loadWorkouts() {
    const workouts: Workouts = await this.storageService.get("workouts");
    this.lastWorkouts = workouts?.slice(-5);
  }

  ngOnInit() {
    this.loadWorkouts();
    this.sub.add(
      this.storageService.onWorkoutsChange().subscribe(() => {
        this.loadWorkouts();
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
