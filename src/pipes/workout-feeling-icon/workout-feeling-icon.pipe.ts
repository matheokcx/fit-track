import { Pipe, PipeTransform } from '@angular/core';
import { feelings } from "../../models/workout";

// ==============================================


@Pipe({
  name: 'workoutFeelingIcon',
  standalone: true
})
export class WorkoutFeelingIconPipe implements PipeTransform {

  public transform(value: string): string {
    if (value.localeCompare(feelings.GOOD) === 0){
      return 'happy-outline';
    }
    else if (value.localeCompare(feelings.MIDDLE) === 0){
      return 'sad-outline';
    }
    else{
      return 'skull-outline';
    }
  }

}
