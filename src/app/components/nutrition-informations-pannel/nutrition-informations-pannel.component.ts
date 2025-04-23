import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { IonCol, IonGrid, IonIcon, IonRow } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { egg, flash, pizza, water } from "ionicons/icons";
import { ProfileInformationsService } from "../../../services/profile-informations/profile-informations.service";
import { Subscription } from "rxjs";

// ==============================================


@Component({
  selector: 'app-nutrition-informations-pannel',
  templateUrl: './nutrition-informations-pannel.component.html',
  styleUrls: ['./nutrition-informations-pannel.component.scss'],
  imports: [IonCol, IonGrid, IonIcon, IonRow]
})
export class NutritionInformationsPannelComponent implements OnInit, OnDestroy {
  protected weight: number | null = null;
  protected weightGoal: number | null = null;
  protected height: number | null = null;
  protected age: number | null = null;

  private profileService: ProfileInformationsService = inject(ProfileInformationsService);
  private sub = new Subscription();

  public constructor(){
    addIcons({flash, egg, water, pizza});
  }

  public async ngOnInit(): Promise<void> {
    this.loadProfileInformations();
    this.sub.add(this.profileService.onProfileChange().subscribe(() => this.loadProfileInformations()));
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private async loadProfileInformations(): Promise<void> {
    this.weight = await this.profileService.getWeight();
    this.weightGoal = await this.profileService.getWeightGoal();
    this.height = await this.profileService.getHeight();
    this.age = await this.profileService.getAge();
  }

  public calculateCaloriesNeeds(): number | null {
    if(!this.weight || !this.height || !this.age) return null;
    return (10 * this.weight + 6.25 * this.height - 5 * this.age + 5) * 1.55 + 300;
  }

}
