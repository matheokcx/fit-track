import { Component, Input } from '@angular/core';
import { IonIcon, IonRange } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { scale, sparkles } from "ionicons/icons";

// ==============================================

@Component({
  selector: 'app-weight-goal-range',
  templateUrl: './weight-goal-range.component.html',
  styleUrls: ['./weight-goal-range.component.scss'],
  imports: [IonIcon, IonRange]
})
export class WeightGoalRangeComponent {
  @Input() weight !: number;
  @Input() weightGoal !: number;

  public constructor(){
    addIcons({scale, sparkles});
  }

}
