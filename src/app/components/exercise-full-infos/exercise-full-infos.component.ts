import { Component, Input } from '@angular/core';
import { Exercise } from "../../../models/exercise";
import { addIcons } from "ionicons";
import { flash } from "ionicons/icons";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonIcon, IonText } from "@ionic/angular/standalone";

// ==============================================


@Component({
  selector: 'app-exercise-full-infos',
  templateUrl: './exercise-full-infos.component.html',
  styleUrls: ['./exercise-full-infos.component.scss'],
  imports: [IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonIcon, IonText]
})
export class ExerciseFullInfosComponent {
  @Input() exercise !: Exercise;
  protected readonly Array = Array;

  public constructor() {
    addIcons({flash});
  }

}
