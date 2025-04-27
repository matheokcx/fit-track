import { Component } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonItem, IonLabel } from "@ionic/angular/standalone";

// ==============================================


@Component({
  selector: 'app-water-modal',
  templateUrl: './water-modal.component.html',
  styleUrls: ['./water-modal.component.scss'],
  imports: [IonContent, IonCardHeader, IonCard, IonCardContent, IonCardTitle, IonItem, IonLabel]
})
export class WaterModalComponent {

}
