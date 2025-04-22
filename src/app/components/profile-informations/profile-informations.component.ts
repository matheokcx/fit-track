import { Component, Input } from '@angular/core';
import { IonIcon, IonItem, IonLabel, IonList } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { chevronExpand, man, restaurant } from "ionicons/icons";

// ==============================================


@Component({
  selector: 'app-profile-informations',
  templateUrl: './profile-informations.component.html',
  styleUrls: ['./profile-informations.component.scss'],
  imports: [IonIcon, IonItem, IonLabel, IonList]
})
export class ProfileInformationsComponent {
  @Input() weight: number | null = null;
  @Input() height: number | null = null;
  @Input() age: number | null = null;

  public constructor(){
    addIcons({chevronExpand, man, restaurant});
  }

}
