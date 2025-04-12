import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'exerciseProgressionManage',
  standalone: true
})
export class ExerciseProgressionManagePipe implements PipeTransform {

  transform(value: number): string {
    if(value == 0){
      return "#878787";
    }
    else if(value == 1){
      return "var(--ion-color-success)";
    }
    else{
      return "var(--ion-color-danger)";
    }
  }

}
