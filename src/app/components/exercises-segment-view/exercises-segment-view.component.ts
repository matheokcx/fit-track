import { Component } from '@angular/core';
import { ExerciseFullInfosComponent } from "../exercise-full-infos/exercise-full-infos.component";
import { IonSearchbar, IonSelect, IonSelectOption, IonText } from "@ionic/angular/standalone";
import { Exercise, EXERCISES, musclesList } from "../../../models/exercise";
import { FormsModule } from "@angular/forms";

// ==============================================


@Component({
  selector: 'app-exercises-segment-view',
  templateUrl: './exercises-segment-view.component.html',
  styleUrls: ['./exercises-segment-view.component.scss'],
  imports: [ExerciseFullInfosComponent, IonSearchbar, IonSelect, IonSelectOption, IonText, FormsModule]
})
export class ExercisesSegmentViewComponent {
  protected allExercises: Exercise[] = EXERCISES;
  protected readonly musclesList = musclesList;
  protected muscleFilter: string | null = null;

  public handleSearchInput(event: Event) {
    const element = event.target as HTMLInputElement;
    const searchPart = element.value;
    this.allExercises = searchPart !== "" ? EXERCISES.filter((exercise: Exercise) => exercise.name.includes(searchPart)) : EXERCISES;
  }

  public filterExercisesByMuscle(): void {
    if (this.muscleFilter !== "Tous") {
      this.allExercises = EXERCISES.filter((exercise: Exercise) => exercise.usedMuscles.includes(this.muscleFilter ?? ""));
    }
    else {
      this.allExercises = EXERCISES;
    }
  }

}
