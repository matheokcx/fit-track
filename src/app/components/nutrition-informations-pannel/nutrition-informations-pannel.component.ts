import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonIcon, IonRow } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { egg, flash, helpCircle, pizza, refreshCircle, water } from "ionicons/icons";
import { ProfileInformationsService } from "../../../services/profile-informations/profile-informations.service";
import { Subscription } from "rxjs";
import { WaterModalComponent } from "../modals/water-modal/water-modal.component";
import { ModalController } from "@ionic/angular";
import { CaloriesModalComponent } from "../modals/calories-modal/calories-modal.component";

// ==============================================


@Component({
  selector: 'app-nutrition-informations-pannel',
  templateUrl: './nutrition-informations-pannel.component.html',
  styleUrls: ['./nutrition-informations-pannel.component.scss'],
  imports: [IonCol, IonGrid, IonIcon, IonRow, IonButton],
  providers: [ModalController]
})
export class NutritionInformationsPannelComponent implements OnInit, OnDestroy {
  protected weight: number | null = null;
  protected weightGoal: number | null = null;
  protected height: number | null = null;
  protected age: number | null = null;
  protected waterConsomation: number = 0;

  private profileService: ProfileInformationsService = inject(ProfileInformationsService);
  private sub = new Subscription();


  public constructor(private modalCtrl: ModalController){
    addIcons({flash, egg, water, pizza, helpCircle, refreshCircle});
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
    this.waterConsomation = await this.profileService.getWaterConsomation();
  }

  protected calculateCaloriesNeeds(): number | null {
    if(!this.weight || !this.height || !this.age) return null;
    return (10 * this.weight + 6.25 * this.height - 5 * this.age + 5) * 1.5 + 300;
  }

  protected async incrementWaterConsomation(): Promise<void> {
    if(this.weight && this.waterConsomation + 0.5 < ((this.weight*40)/1000)){
      await this.profileService.setWaterConsomation(this.waterConsomation + 0.5);
    }
    else if(this.weight && this.waterConsomation + 0.5 > ((this.weight*40)/1000)){
      await this.profileService.setWaterConsomation((this.weight*40)/1000);
    }
  }

  protected async decrementWaterConsomation(): Promise<void> {
    if (this.waterConsomation > 0) {
      await this.profileService.setWaterConsomation(this.waterConsomation - 0.5);
    }
  }

  protected async resetWaterConsomation(): Promise<void> {
    await this.profileService.setWaterConsomation(0);
  }

  protected async openWaterModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: WaterModalComponent,
      breakpoints: [0, 0.4, 1],
      initialBreakpoint: 0.4,
    });
    modal.present();
    const { data } = await modal.onDidDismiss();
  }

  protected async openCaloriesModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: CaloriesModalComponent,
      breakpoints: [0, 0.4, 1],
      initialBreakpoint: 0.4,
    });
    modal.present();
    const { data } = await modal.onDidDismiss();
  }

}
