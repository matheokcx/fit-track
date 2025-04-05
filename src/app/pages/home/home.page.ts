import {Component, inject, OnInit} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonLabel,
  IonItem,
  IonIcon, IonListHeader
} from '@ionic/angular/standalone';
import {feelings, Workout, Workouts} from "../../../models/workout";
import {trendingDown, trendingUp} from "ionicons/icons";
import {addIcons} from "ionicons";
import {WorkoutItemComponent} from "../../components/workout-item/workout-item.component";
import {muscles} from "../../../models/exercise";
import {StorageService} from "../../../services/storage/storage.service";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonList, IonLabel, IonListHeader, WorkoutItemComponent],
})
export class HomePage implements OnInit {
  protected lastWorkouts: Workout[] = [];
  protected storageService: StorageService = inject(StorageService);

  public constructor() {
    addIcons({trendingUp, trendingDown});
  }

  async ngOnInit() {
    await this.storageService.set("workouts", [
      {
        id: 0,
        pattern: {
          name: "Biceps + épaules",
          exercises: [
            {
              name: "Curl allongé",
              description: "Variante du classique curl, sur banc en position allongé pour pouvoir travailelr davantage la longue portion du biceps",
              usedMuscles: [muscles.BICEPS, muscles.TRICEPS]
            }
          ]
        },
        startHour: "2025-04-04T19:00:00",
        endHour: "2025-04-04T21:00:00",
        feeling: feelings.VERY_GOOD
      }
    ]);
    this.lastWorkouts = await this.storageService.get("workouts").then((workouts: Workouts) => workouts.slice(-10));
  }

}
