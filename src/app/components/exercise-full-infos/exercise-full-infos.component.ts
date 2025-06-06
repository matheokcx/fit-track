import { Component, Input } from '@angular/core';
import { Exercise } from "../../../models/exercise";
import { addIcons } from "ionicons";
import { flash, timer } from "ionicons/icons";
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
    addIcons({flash, timer});
  }

  protected getBreakTime(): string {
    const minutes: string = (this.exercise.breakTime/60).toFixed(1).split(".")[0];
    const seconds: string = (this.exercise.breakTime%60).toFixed(0)
    return `${minutes}min${seconds === "0" ? "" : seconds}`;
  }

}
