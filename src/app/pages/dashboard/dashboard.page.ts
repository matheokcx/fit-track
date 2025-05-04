import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { LastWorkoutsListComponent } from "../../components/last-workouts-list/last-workouts-list.component";
import { NutritionInformationsPannelComponent } from "../../components/nutrition-informations-pannel/nutrition-informations-pannel.component";
import { addIcons } from "ionicons";
import { add } from "ionicons/icons";
import { WorkoutAddModalComponent } from "../../components/modals/workout-add-modal/workout-add-modal.component";
import { ModalController } from "@ionic/angular";
import {CaloriesGraphComponent} from "../../components/calories-graph/calories-graph.component";

// ==============================================


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonToolbar, IonHeader, IonTitle, LastWorkoutsListComponent, NutritionInformationsPannelComponent, IonFab, IonFabButton, IonIcon, CaloriesGraphComponent],
  providers: [ModalController]
})
export class DashboardPage {

  public constructor(private modalCtrl: ModalController){
    addIcons({add});
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
