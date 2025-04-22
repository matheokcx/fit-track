import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonList, IonListHeader, IonTitle, IonToolbar, IonIcon, IonItem, IonRow, IonGrid, IonCol } from '@ionic/angular/standalone';
import { WorkoutItemComponent } from "../../components/workout-item/workout-item.component";
import { Workouts } from "../../../models/workout";
import { addIcons } from "ionicons";
import { add, egg, flash, pizza, water, informationCircle } from "ionicons/icons";
import { Subscription } from "rxjs";
import { WorkoutService } from "../../../services/workout/workout.service";
import { RouterLink } from "@angular/router";
import { ProfileInformationsService } from "../../../services/profile-informations/profile-informations.service";

// ==============================================


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonList, IonListHeader, WorkoutItemComponent, IonToolbar, IonHeader, IonTitle, IonButton, IonIcon, IonItem, RouterLink, IonRow, IonGrid, IonCol]
})
export class DashboardPage implements OnInit, OnDestroy {
  protected lastWorkouts: Workouts = [];
  protected weight: number | null = null;
  protected weightGoal: number | null = null;
  protected height: number | null = null;
  protected age: number | null = null;
  protected workoutService: WorkoutService = inject(WorkoutService);
  protected profileService: ProfileInformationsService = inject(ProfileInformationsService);
  private sub = new Subscription();

  public constructor() {
    addIcons({add, flash, egg, water, pizza, informationCircle});
  }

  public async ngOnInit() {
    this.loadWorkouts();
    this.loadProfileInformations();
    this.sub.add(this.workoutService.onWorkoutsChange().subscribe(() => this.loadWorkouts()));
    this.sub.add(this.profileService.onProfileChange().subscribe(() => this.loadProfileInformations()));
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private async loadWorkouts() {
    const workouts: Workouts = await this.workoutService.getWorkouts();
    this.lastWorkouts = (workouts?.slice(-5, workouts.length)).reverse();
  }

  private async loadProfileInformations() {
    this.weight = await this.profileService.getWeight();
    this.weightGoal = await this.profileService.getWeightGoal();
    this.height = await this.profileService.getHeight();
    this.age = await this.profileService.getAge();
  }

  /**
   * Function to calculate the calories needs in a day for a person
   * (10 * weight (kg) + 6.25 * height (cm) - 5 * age + 5) * activity level + 200-500 over
   */
  public calculateCaloriesNeeds(): number | null {
    if(!this.weight || !this.height || !this.age) return null;
    return (10 * this.weight + 6.25 * this.height - 5 * this.age + 5) * 1.55 + 300;
  }

}
