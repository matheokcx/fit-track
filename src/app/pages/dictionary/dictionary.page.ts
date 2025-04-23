import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonLabel, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ExercisesSegmentViewComponent } from "../../components/exercises-segment-view/exercises-segment-view.component";
import { FoodSegmentViewComponent } from "../../components/food-segment-view/food-segment-view.component";

// ==============================================


@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.page.html',
  styleUrls: ['./dictionary.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSegment, IonSegmentButton, IonLabel, IonSegmentView, IonSegmentContent, ExercisesSegmentViewComponent, FoodSegmentViewComponent]
})
export class DictionaryPage {

}
