import { Component, OnInit } from '@angular/core';
import {IonButton, IonContent, IonHeader, IonModal, IonText, IonTitle, IonToolbar} from "@ionic/angular/standalone";

@Component({
    selector: 'app-calories-modal',
    templateUrl: './calories-modal.component.html',
    styleUrls: ['./calories-modal.component.scss'],
    imports: [
        IonButton,
        IonContent,
        IonHeader,
        IonModal,
        IonText,
        IonTitle,
        IonToolbar
    ]
})
export class CaloriesModalComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
