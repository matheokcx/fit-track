import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonSearchbar, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Exercise, EXERCISES, musclesList } from "../../../models/exercise";
import { ExerciseFullInfosComponent } from "../../components/exercise-full-infos/exercise-full-infos.component";
import { barbell, restaurant } from "ionicons/icons";
import { addIcons } from "ionicons";

// ==============================================


@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.page.html',
  styleUrls: ['./dictionary.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonText, ExerciseFullInfosComponent, IonSearchbar, IonSelectOption, IonSelect]
})
export class DictionaryPage {
  protected allExercises: Exercise[] = EXERCISES;
  protected muscleFilter: string | null = null;
  protected readonly musclesList = musclesList;

  public constructor() {
    addIcons({barbell, restaurant});
  }

  protected handleSearchInput(event: Event){
    const element = event.target as HTMLInputElement;
    const searchPart = element.value;
    this.allExercises = searchPart !== "" ? EXERCISES.filter((exercise: Exercise) => exercise.name.includes(searchPart)) : EXERCISES;
  }

  public filterExercisesByMuscle(): void {
    if (this.muscleFilter !== "Tous") {
      this.allExercises = EXERCISES.filter((exercise: Exercise) => exercise.usedMuscles.includes(this.muscleFilter ?? ""));
    }
    else{
      this.allExercises = EXERCISES;
    }
  }

}
