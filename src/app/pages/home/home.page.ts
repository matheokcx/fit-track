import { Component } from '@angular/core';
import { IonContent, IonTabs, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { add, barbell, library, home, personCircle } from "ionicons/icons";
import { addIcons } from "ionicons";

// ==============================================


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonTabs, IonTabBar, IonTabButton, IonIcon]
})
export class HomePage {

  public constructor() {
    addIcons({add, home, barbell, library, personCircle});
  }

}
