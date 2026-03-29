import {Component} from '@angular/core';
import {FoodCardComponent} from '../cards/food-card/food-card.component';
import {Food, FOODS} from '../../../models/food';

@Component({
    selector: 'app-food-segment-view',
    templateUrl: './food-segment-view.component.html',
    imports: [FoodCardComponent]
})
export class FoodSegmentViewComponent {
    protected readonly FOODS: Food[] = FOODS;
}
