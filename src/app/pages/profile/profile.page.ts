import {Component, OnInit, inject, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { ProfileInformationsService } from "../../../services/profile-informations/profile-informations.service";
import { Subscription } from "rxjs";

// ==============================================


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonInput, IonButton]
})
export class ProfilePage implements OnInit {
  protected height: number | null = null;
  protected weight: number | null = null;
  protected weightGoal: number | null = null;
  protected dailyCaloriesGoal: number | null = null;
  private profileService: ProfileInformationsService = inject(ProfileInformationsService)
  private sub: Subscription = new Subscription();

  public async ngOnInit() {
    await this.loadProfileInformations();
    this.sub.add(() => {
      this.profileService.onProfileChange().subscribe(() => this.loadProfileInformations())
    });
  }

  private async loadProfileInformations(): Promise<void> {
    this.height = await this.profileService.getHeight() || null;
    this.weight = await this.profileService.getWeight() || null;
    this.weightGoal = await this.profileService.getWeightGoal() || null;
    this.dailyCaloriesGoal = await this.profileService.getDailyCaloriesGoal() || null;
  }

  public onHeightChange= async (value: number) => await this.profileService.setHeight(value);


  public onWeightChange= async (value: number) => await this.profileService.setWeight(value);


  public onWeightGoalChange= async (value: number) => await this.profileService.setWeightGoal(value);


  public onDailyCaloriesGoalChange = async (value: number) => await this.profileService.setDailyCaloriesGoal(value);

}
