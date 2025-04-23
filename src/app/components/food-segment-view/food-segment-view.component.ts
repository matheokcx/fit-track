import { Component, OnInit } from '@angular/core';
import {FoodCardComponent} from "../cards/food-card/food-card.component";
import {IonSegmentContent} from "@ionic/angular/standalone";
import {FOODS} from "../../../models/food";

@Component({
    selector: 'app-food-segment-view',
    templateUrl: './food-segment-view.component.html',
    styleUrls: ['./food-segment-view.component.scss'],
    imports: [
        FoodCardComponent,
        IonSegmentContent
    ]
})
export class FoodSegmentViewComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

    protected readonly FOODS = FOODS;
}
