import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Workouts } from "../../../models/workout";
import { WorkoutItemComponent } from "../../components/workout-item/workout-item.component";
import { WorkoutService } from "../../../services/workout/workout.service";
import { Subscription } from "rxjs";
import { addIcons } from "ionicons";
import { add}  from "ionicons/icons";
import { WorkoutAddModalComponent } from "../../components/modals/workout-add-modal/workout-add-modal.component";
import { ModalController } from "@ionic/angular";

// ==============================================


@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.page.html',
  styleUrls: ['./workouts-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, WorkoutItemComponent, IonButton, IonItem, IonIcon, IonList],
  providers: [ModalController]
})
export class WorkoutsListPage implements OnInit {
  protected workouts: Workouts = [];
  private workoutService: WorkoutService = inject(WorkoutService);
  private sub = new Subscription();

  public constructor(private modalCtrl: ModalController) {
    addIcons({add});
  }

  public async ngOnInit(): Promise<void> {
    this.loadWorkouts();
    this.sub.add(
      this.workoutService.onWorkoutsChange().subscribe(() => this.loadWorkouts())
    );
  }

  private async loadWorkouts(): Promise<void> {
    this.workouts = await this.workoutService.getWorkouts().then(list => list.reverse());
  }

  protected async openWorkoutAddModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: WorkoutAddModalComponent,
      breakpoints: [0, 0.4, 1],
      initialBreakpoint: 0.4,
    });
    modal.present();
    const { data } = await modal.onDidDismiss();
  }

}
