import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonLabel, IonSearchbar, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonText, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import { Exercise, EXERCISES, muscles } from "../../../models/exercise";
import { ExerciseFullInfosComponent } from "../../components/exercise-full-infos/exercise-full-infos.component";
import { FOODS, Foods } from "../../../models/food";
import { barbell, restaurant } from "ionicons/icons";
import { addIcons } from "ionicons";
import { FoodCardComponent } from "../../components/food-card/food-card.component";

// ==============================================


@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.page.html',
  styleUrls: ['./dictionary.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonText, ExerciseFullInfosComponent, IonSegment, IonSegmentButton, IonLabel, IonSegmentView, IonSegmentContent, IonIcon, FoodCardComponent, IonSearchbar]
})
export class DictionaryPage {
  protected allExercises: Exercise[] = EXERCISES;
  protected allFoods: Foods = FOODS;

  public constructor() {
    addIcons({barbell, restaurant});
  }

  protected handleSearchInput(event: Event){
    const element = event.target as HTMLInputElement;
    const searchPart = element.value;
    this.allExercises = searchPart !== "" ? EXERCISES.filter((exercise: Exercise) => exercise.name.includes(searchPart)) : EXERCISES;
  }

  protected readonly muscles = muscles;
}
