import { Component } from '@angular/core';
import { FoodCardComponent } from "../cards/food-card/food-card.component";
import { FOODS } from "../../../models/food";

// ==============================================


@Component({
  selector: 'app-food-segment-view',
  templateUrl: './food-segment-view.component.html',
  styleUrls: ['./food-segment-view.component.scss'],
  imports: [FoodCardComponent]
})
export class FoodSegmentViewComponent {
  protected readonly FOODS = FOODS;
}
