import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { StorageService } from "../../../services/storage/storage.service";
import { Workouts } from "../../../models/workout";
import { WorkoutItemComponent } from "../../components/workout-item/workout-item.component";

// ==============================================


@Component({
  selector: 'app-workouts-list',
  templateUrl: './workouts-list.page.html',
  styleUrls: ['./workouts-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, WorkoutItemComponent, IonText]
})
export class WorkoutsListPage implements OnInit {
  protected workouts: Workouts = [];
  private storageService: StorageService = inject(StorageService);

  async ngOnInit() {
    this.workouts = await this.storageService.get("workouts") || [];
  }

}
