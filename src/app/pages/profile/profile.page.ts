import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonAlert, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRange, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ProfileInformationsService } from "../../../services/profile-informations/profile-informations.service";
import { Subscription } from "rxjs";
import { addIcons } from "ionicons";
import { chevronExpand, fastFood, man, nutrition, restaurant, scale, sparkles, trash } from "ionicons/icons";
import { WorkoutService } from "../../../services/workout/workout.service";
import { WorkoutPatternService } from "../../../services/pattern/workout-pattern.service";
import {ProfileInformationsComponent} from "../../components/profile-informations/profile-informations.component";
import {WeightGoalRangeComponent} from "../../components/ranges/weight-goal-range/weight-goal-range.component";
import {ImcRangeComponent} from "../../components/ranges/imc-range/imc-range.component";

// ==============================================


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonInput, IonButton, IonLabel, IonRange, IonIcon, IonAlert, ProfileInformationsComponent, WeightGoalRangeComponent, ImcRangeComponent]
})
export class ProfilePage implements OnInit, OnDestroy {
  protected height: number | null = null;
  protected weight: number | null = null;
  protected weightGoal: number | null = null;
  protected age: number | null = null;
  protected alertButtons = [
    {
      text: 'Annuler',
      role: 'cancel'
    },
    {
      text: 'Valider',
      role: 'confirm',
      handler: async () => {
        await this.resetDatas();
      }
    }
  ];

  private profileService: ProfileInformationsService = inject(ProfileInformationsService);
  protected workoutService: WorkoutService = inject(WorkoutService);
  protected workoutPatternService: WorkoutPatternService = inject(WorkoutPatternService);
  private sub: Subscription = new Subscription();

  public constructor() {
    addIcons({scale, sparkles, nutrition, fastFood, restaurant, man, trash, chevronExpand});
  }

  public async ngOnInit() {
    await this.loadProfileInformations();
    this.sub.add(this.profileService.onProfileChange().subscribe(() => this.loadProfileInformations()));
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public getIMC(): number | null {
    if(this.weight && this.height){
      return this.weight / ((this.height / 100) * (this.height / 100));
    }
    return null;
  }

  private async loadProfileInformations(): Promise<void> {
    this.height = await this.profileService.getHeight() || null;
    this.weight = await this.profileService.getWeight() || null;
    this.weightGoal = await this.profileService.getWeightGoal() || null;
    this.age = await this.profileService.getAge() || null;
  }

  public onHeightChange= async (value: number) => await this.profileService.setHeight(value);

  public onWeightChange= async (value: number) => await this.profileService.setWeight(value);

  public onWeightGoalChange= async (value: number) => await this.profileService.setWeightGoal(value);

  public onAgeChange = async (value: number) => await this.profileService.setAge(value);

  protected async resetDatas(): Promise<void> {
    await this.workoutService.removeAllWorkouts();
    await this.workoutPatternService.removeAllWorkoutPatterns();
    await this.profileService.resetProfile();
  }

}
