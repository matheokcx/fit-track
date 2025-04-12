import { Component, Input } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonIcon, IonList, IonText } from "@ionic/angular/standalone";
import { FinishedExercise } from "../../../models/workout";

// ==============================================


@Component({
    selector: 'app-exercise-card',
    templateUrl: './exercise-card.component.html',
    styleUrls: ['./exercise-card.component.scss'],
    imports: [IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonIcon, IonList, IonText]
})
export class ExerciseCardComponent {
  @Input() exercise !: FinishedExercise;

  protected readonly Array = Array;
}
