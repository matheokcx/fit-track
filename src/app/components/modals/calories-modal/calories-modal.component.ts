import {Component} from '@angular/core';
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonItem,
    IonLabel,
} from '@ionic/angular/standalone';

@Component({
    selector: 'app-calories-modal',
    templateUrl: './calories-modal.component.html',
    imports: [
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonItem,
        IonLabel
    ]
})
export class CaloriesModalComponent {

}
