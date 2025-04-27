import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonAlert, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ProfileInformationsService } from "../../../services/profile-informations/profile-informations.service";
import { Subscription } from "rxjs";
import { addIcons } from "ionicons";
import { chevronExpand, fastFood, man, nutrition, restaurant, scale, sparkles, trash } from "ionicons/icons";
import { WorkoutService } from "../../../services/workout/workout.service";
import { WorkoutPatternService } from "../../../services/pattern/workout-pattern.service";
import { ProfileInformationsComponent } from "../../components/profile-informations/profile-informations.component";
import { WeightGoalRangeComponent } from "../../components/ranges/weight-goal-range/weight-goal-range.component";
import { ImcRangeComponent } from "../../components/ranges/imc-range/imc-range.component";

// ==============================================


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonButton, IonIcon, IonAlert, ProfileInformationsComponent, WeightGoalRangeComponent, ImcRangeComponent]
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
  private workoutService: WorkoutService = inject(WorkoutService);
  private workoutPatternService: WorkoutPatternService = inject(WorkoutPatternService);
  private sub: Subscription = new Subscription();

  public constructor() {
    addIcons({scale, sparkles, nutrition, fastFood, restaurant, man, trash, chevronExpand});
  }

  public async ngOnInit(): Promise<void> {
    await this.loadProfileInformations();
    this.sub.add(this.profileService.onProfileChange().subscribe(() => this.loadProfileInformations()));
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  protected getIMC(): number | null {
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

  protected async onHeightChange(value: number): Promise<void> {
    await this.profileService.setHeight(value);
  }

  protected async onWeightChange(value: number): Promise<void> {
    await this.profileService.setWeight(value);
  }

  protected async onWeightGoalChange(value: number): Promise<void> {
    await this.profileService.setWeightGoal(value);
  }

  protected async onAgeChange(value: number): Promise<void> {
    await this.profileService.setAge(value);
  }

  private async resetDatas(): Promise<void> {
    await this.workoutService.removeAllWorkouts();
    await this.workoutPatternService.removeAllWorkoutPatterns();
    await this.profileService.resetProfile();
  }

}
