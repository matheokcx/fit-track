import {Component, inject, OnInit} from '@angular/core';
import {
  IonContent,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon
} from '@ionic/angular/standalone';
import {add, home, trendingDown, trendingUp} from "ionicons/icons";
import {addIcons} from "ionicons";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonTabs, IonTabBar, IonTabButton, IonIcon],
})
export class HomePage {
  public constructor() {
    addIcons({add, home})
  }
}
