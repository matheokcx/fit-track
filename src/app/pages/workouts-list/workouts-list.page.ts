import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Workouts } from "../../../models/workout";
import { WorkoutItemComponent } from "../../components/workout-item/workout-item.component";
import { WorkoutService } from "../../../services/workout/workout.service";
import { Subscription } from "rxjs";
import { RouterLink } from "@angular/router";
import { addIcons } from "ionicons";
import { add}  from "ionicons/icons";

// ==============================================


@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.page.html',
  styleUrls: ['./workouts-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, WorkoutItemComponent, IonText, RouterLink, IonButton, IonItem, IonIcon]
})
export class WorkoutsListPage implements OnInit {
  protected workouts: Workouts = [];
  private workoutService: WorkoutService = inject(WorkoutService);
  private sub = new Subscription();

  public constructor() {
    addIcons({add});
  }

  async ngOnInit(): Promise<void> {
    this.loadWorkouts();
    this.sub.add(
      this.workoutService.onWorkoutsChange().subscribe(() => this.loadWorkouts())
    );
  }

  protected async loadWorkouts(): Promise<void> {
    this.workouts = await this.workoutService.getWorkouts().then(list => list.reverse());
  }

}
