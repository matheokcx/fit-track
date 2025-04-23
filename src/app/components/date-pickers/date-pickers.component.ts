import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonCol, IonDatetime, IonGrid, IonRow, IonText } from "@ionic/angular/standalone";
import { FormsModule } from "@angular/forms";

// ==============================================


@Component({
  selector: 'app-date-pickers',
  templateUrl: './date-pickers.component.html',
  styleUrls: ['./date-pickers.component.scss'],
  imports: [IonCol, IonDatetime, IonGrid, IonRow, IonText, FormsModule]
})
export class DatePickersComponent {
  @Input() startHour !: number;
  @Input() endHour !: number;
  @Output() startHourChange = new EventEmitter<string>();
  @Output() endHourChange = new EventEmitter<string>();

}
