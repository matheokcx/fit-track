import { Component, inject, Input } from '@angular/core';
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonRippleEffect } from "@ionic/angular/standalone";
import { Workout } from "../../../models/workout";
import { WorkoutFeelingIconPipe } from "../../../pipes/workout-feeling-icon/workout-feeling-icon.pipe";
import { addIcons } from "ionicons";
import { eyeOutline, happyOutline, sadOutline, skullOutline, trash, create } from "ionicons/icons";
import { WorkoutFeelingIconColorPipe } from "../../../pipes/workout-feeling-icon/workout-feeling-icon-color.pipe";
import { Router, RouterLink } from "@angular/router";
import { WorkoutService } from "../../../services/workout/workout.service";

// ==============================================


@Component({
  selector: 'app-workout-item',
  templateUrl: './workout-item.component.html',
  styleUrls: ['./workout-item.component.scss'],
  imports: [IonIcon, IonItem, IonLabel, WorkoutFeelingIconPipe, WorkoutFeelingIconColorPipe, RouterLink, IonItemSliding, IonItemOptions, IonItemOption, IonRippleEffect]
})
export class WorkoutItemComponent{
  @Input() workout !: Workout;
  private router: Router = new Router();
  private workoutService : WorkoutService = inject(WorkoutService);

  public constructor() {
    addIcons({happyOutline, sadOutline, skullOutline, eyeOutline, trash, create});
  }

  async deleteWorkout() : Promise<void> {
    await this.workoutService.removeWorkout(this.workout.id);
  }

  public redirectToEditWorkout = () => this.router.navigate([`/workout-edit/${this.workout.id}`]);

}
