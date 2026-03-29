import {Component} from '@angular/core';
import {IonContent, IonIcon, IonTabBar, IonTabButton, IonTabs,} from '@ionic/angular/standalone';
import {add, barbell, calendarOutline, home, library, personCircle} from 'ionicons/icons';
import {addIcons} from 'ionicons';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    imports: [
        IonContent,
        IonTabs,
        IonTabBar,
        IonTabButton,
        IonIcon
    ]
})
export class HomePage {
    public constructor() {
        addIcons({ add, home, barbell, library, personCircle, calendarOutline });
    }
}
