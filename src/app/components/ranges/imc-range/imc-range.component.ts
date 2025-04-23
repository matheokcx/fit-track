import { Component, Input } from '@angular/core';
import { IonIcon, IonRange } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { fastFood, nutrition } from "ionicons/icons";

// ==============================================


@Component({
  selector: 'app-imc-range',
  templateUrl: './imc-range.component.html',
  styleUrls: ['./imc-range.component.scss'],
  imports: [IonIcon, IonRange]
})
export class ImcRangeComponent {
  @Input() imc !: number | null;

  public constructor(){
    addIcons({nutrition, fastFood});
  }

}
