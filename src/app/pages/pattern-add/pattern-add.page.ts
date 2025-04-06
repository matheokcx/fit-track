import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader, IonIcon,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {StorageService} from "../../../services/storage/storage.service";
import {Pattern} from "../../../models/pattern";
import {EXERCISES, Exercises} from "../../../models/exercise";
import {addCircleOutline} from "ionicons/icons";
import {addIcons} from "ionicons";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-pattern-add',
  templateUrl: './pattern-add.page.html',
  styleUrls: ['./pattern-add.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonInput, IonSelect, IonSelectOption, IonButton, IonIcon, RouterLink, IonHeader, IonTitle, IonToolbar]
})
export class PatternAddPage {
  protected patternName: string = "";
  protected selectedExerciseNames: string[] = [];
  protected storageService: StorageService = inject(StorageService);
  protected allExercises: Exercises = EXERCISES;

  public constructor() {
    addIcons({addCircleOutline})
  }

  async addPattern(): Promise<void> {
    const patterns: Pattern[] = await this.storageService.get("patterns") || [];
    const newPattern: Pattern = {
      name: this.patternName,
      exercises: this.allExercises.filter(exercise => this.selectedExerciseNames.includes(exercise.name))
    }
    await this.storageService.set("patterns", patterns.concat(newPattern));
  }

}
