import { Component } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";

// ==============================================


@Component({
  selector: 'app-water-modal',
  templateUrl: './water-modal.component.html',
  styleUrls: ['./water-modal.component.scss'],
  imports: [IonModal, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonText]
})
export class WaterModalComponent {

}
