import { Pipe, PipeTransform } from '@angular/core';
import { feelings } from "../../models/workout";

// ==============================================


@Pipe({
  name: 'workoutFeelingIconColor',
  standalone: true
})
export class WorkoutFeelingIconColorPipe implements PipeTransform {

  public transform(value: string): string {
    if(value.localeCompare(feelings.GOOD) === 0){
      return "success";
    }
    else if (value.localeCompare(feelings.MIDDLE) === 0){
      return "warning";
    }
    else{
      return "danger";
    }
  }

}
