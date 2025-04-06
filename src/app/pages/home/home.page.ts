import {Component, inject, OnInit} from '@angular/core';
import {
  IonContent,
  IonList,
  IonLabel,
  IonListHeader
} from '@ionic/angular/standalone';
import {Workout, Workouts} from "../../../models/workout";
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
    await this.storageService.set("patterns", [
      {
          name: "Biceps + épaules",
          exercises: [
            {
              name: "Curl allongé",
              description: "Variante du classique curl, sur banc en position allongé pour pouvoir travailelr davantage la longue portion du biceps",
              usedMuscles: [muscles.BICEPS, muscles.TRICEPS]
            }
          ]
      }
    ]);
    this.lastWorkouts = await this.storageService.get("workouts").then((workouts: Workouts) => workouts.slice(-10));
  }

}
