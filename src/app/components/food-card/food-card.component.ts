import { Component, Input } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonItem, IonList } from "@ionic/angular/standalone";
import { Food } from "../../../models/food";

// ==============================================


@Component({
    selector: 'app-food-card',
    templateUrl: './food-card.component.html',
    styleUrls: ['./food-card.component.scss'],
    imports: [IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonItem, IonList]
})
export class FoodCardComponent {
  @Input() food !: Food;

}
