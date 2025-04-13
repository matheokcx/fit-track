import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { WorkoutPattern } from "../../../models/workoutPattern";
import { EXERCISES, Exercises } from "../../../models/exercise";
import { addCircleOutline } from "ionicons/icons";
import { addIcons } from "ionicons";
import { RouterLink } from "@angular/router";
import { WorkoutPatternService } from "../../../services/pattern/workout-pattern.service";
import { AlertController } from "@ionic/angular";

// ==============================================


@Component({
  selector: 'app-pattern-add',
  templateUrl: './pattern-add.page.html',
  styleUrls: ['./pattern-add.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonInput, IonSelect, IonSelectOption, IonButton, IonIcon, RouterLink, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons]
})
export class PatternAddPage {
  protected patternName: string = "";
  protected selectedExerciseNames: string[] = [];
  protected allExercises: Exercises = EXERCISES;
  private alertController: AlertController = new AlertController();
  protected workoutPatternsService: WorkoutPatternService = inject(WorkoutPatternService);

  public constructor() {
    addIcons({addCircleOutline});
  }

  protected async addPattern(): Promise<void> {
    const patterns: WorkoutPattern[] = await this.workoutPatternsService.getWorkoutPatterns();
    if(patterns.some((pattern: WorkoutPattern) => pattern.name === this.patternName)){
      const alert = await this.alertController.create({
        header: 'Déjà pris',
        message: 'Vous avez déjà une séance qui porte le même nom.',
        buttons: ['Fermer']
      });
      await alert.present();
    }
    else{
      const newPattern: WorkoutPattern = {
        id: patterns[patterns.length - 1]?.id + 1 || 0,
        name: this.patternName,
        exercises: this.allExercises.filter(exercise => this.selectedExerciseNames.includes(exercise.name))
      };
      await this.workoutPatternsService.addWorkoutPattern(newPattern);
    }
  }

}
