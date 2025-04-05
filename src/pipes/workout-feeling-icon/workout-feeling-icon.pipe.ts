import { Pipe, PipeTransform } from '@angular/core';
import {feelings} from "../../models/workout";

@Pipe({
  name: 'workoutFeelingIcon',
  standalone: true
})
export class WorkoutFeelingIconPipe implements PipeTransform {

  transform(value: string): string {
    if(value === feelings.VERY_GOOD){
      return 'caret-up-circle';
    }
    else if (value === feelings.GOOD){
      return 'caret-up';
    }
    else if (value === feelings.MIDDLE){
      return 'caret-forward';
    }
    else{
      return 'caret-down';
    }
  }

}
