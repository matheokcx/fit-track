import {Component, EventEmitter, Input, Output} from '@angular/core';
import { IonIcon, IonLabel, IonRange } from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";

// ==============================================


@Component({
  selector: 'app-feeling-range',
  templateUrl: './feeling-range.component.html',
  styleUrls: ['./feeling-range.component.scss'],
  imports: [IonIcon, IonLabel, IonRange, FormsModule]
})
export class FeelingRangeComponent {
  @Input() feeling !: number;
  @Output() feelingChange = new EventEmitter<string>();
}
