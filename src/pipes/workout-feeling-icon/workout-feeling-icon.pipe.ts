import { Pipe, PipeTransform } from '@angular/core';
import { feelings } from "../../models/workout";

// ==============================================


@Pipe({
  name: 'workoutFeelingIcon',
  standalone: true
})
export class WorkoutFeelingIconPipe implements PipeTransform {

  public transform(value: string): string {
    if (value === feelings.GOOD){
      return 'happy-outline';
    }
    else if (value === feelings.MIDDLE){
      return 'sad-outline';
    }
    else{
      return 'skull-outline';
    }
  }

}
