import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { LastWorkoutsListComponent } from "../../components/last-workouts-list/last-workouts-list.component";
import { NutritionInformationsPannelComponent } from "../../components/nutrition-informations-pannel/nutrition-informations-pannel.component";

// ==============================================


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonToolbar, IonHeader, IonTitle, LastWorkoutsListComponent, NutritionInformationsPannelComponent]
})
export class DashboardPage {

}
