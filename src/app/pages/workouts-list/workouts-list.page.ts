import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Workouts } from "../../../models/workout";
import { WorkoutItemComponent } from "../../components/workout-item/workout-item.component";
import { WorkoutService } from "../../../services/workout/workout.service";
import { Subscription } from "rxjs";

// ==============================================


@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.page.html',
  styleUrls: ['./workouts-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, WorkoutItemComponent, IonText]
})
export class WorkoutsListPage implements OnInit {
  protected workouts: Workouts = [];
  private workoutService: WorkoutService = inject(WorkoutService);
  private sub = new Subscription();

  async ngOnInit() {
    this.loadWorkouts();
    this.sub.add(
      this.workoutService.onWorkoutsChange().subscribe(() => {
        this.loadWorkouts();
      })
    );
  }

  async loadWorkouts(): Promise<void> {
    this.workouts = await this.workoutService.getWorkouts().then(list => list.reverse());
  }

}
