import { Component, Input } from '@angular/core';
import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/angular/standalone";
import { Workout } from "../../../models/workout";
import { WorkoutFeelingIconPipe } from "../../../pipes/workout-feeling-icon/workout-feeling-icon.pipe";
import { addIcons } from "ionicons";
import { eyeOutline, happyOutline, sadOutline, skullOutline } from "ionicons/icons";
import { WorkoutFeelingIconColorPipe } from "../../../pipes/workout-feeling-icon/workout-feeling-icon-color.pipe";
import { RouterLink } from "@angular/router";

// ==============================================


@Component({
  selector: 'app-workout-item',
  templateUrl: './workout-item.component.html',
  styleUrls: ['./workout-item.component.scss'],
  imports: [IonIcon, IonItem, IonLabel, WorkoutFeelingIconPipe, WorkoutFeelingIconColorPipe, RouterLink, IonButton]
})
export class WorkoutItemComponent{
  @Input() workout !: Workout;

  public constructor() {
    addIcons({happyOutline, sadOutline, skullOutline, eyeOutline});
  }

}
