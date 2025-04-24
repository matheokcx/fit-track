import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { IonButton, IonIcon, IonItem, IonList, IonListHeader } from "@ionic/angular/standalone";
import { WorkoutItemComponent } from "../workout-item/workout-item.component";
import { Workouts } from "../../../models/workout";
import { RouterLink } from "@angular/router";
import { add } from "ionicons/icons";
import { addIcons } from "ionicons";
import { WorkoutService } from "../../../services/workout/workout.service";
import { Subscription } from "rxjs";
import {CaloriesModalComponent} from "../modals/calories-modal/calories-modal.component";
import {ModalController} from "@ionic/angular";
import {WorkoutAddModalComponent} from "../modals/workout-add-modal/workout-add-modal.component";

// ==============================================


@Component({
  selector: 'app-last-workouts-list',
  templateUrl: './last-workouts-list.component.html',
  styleUrls: ['./last-workouts-list.component.scss'],
  imports: [IonButton, IonIcon, IonItem, IonList, IonListHeader, WorkoutItemComponent],
  providers: [ModalController]
})
export class LastWorkoutsListComponent implements OnInit, OnDestroy {
  protected lastWorkouts: Workouts = [];
  private workoutService: WorkoutService = inject(WorkoutService);
  private sub = new Subscription();

  public constructor(private modalCtrl: ModalController){
    addIcons({add});
  }

  public async ngOnInit(): Promise<void> {
    await this.loadWorkouts();
    this.sub.add(this.workoutService.onWorkoutsChange().subscribe(() => this.loadWorkouts()));
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private async loadWorkouts() {
    const workouts: Workouts = await this.workoutService.getWorkouts();
    this.lastWorkouts = (workouts?.slice(-5, workouts.length)).reverse();
  }

  public async openWorkoutAddModal(): Promise<void> {
      const modal = await this.modalCtrl.create({
        component: WorkoutAddModalComponent,
        breakpoints: [0, 0.4, 1],
        initialBreakpoint: 0.4,
      });
      modal.present();
      const { data } = await modal.onDidDismiss();
    }

}
