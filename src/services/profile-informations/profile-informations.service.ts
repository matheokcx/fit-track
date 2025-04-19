import { inject, Injectable } from '@angular/core';
import { StorageService } from "../storage/storage.service";
import { BehaviorSubject } from "rxjs";

// ==============================================


@Injectable({
  providedIn: 'root'
})
export class ProfileInformationsService {
  private profileChanged$ = new BehaviorSubject<void>(undefined);
  private storageService: StorageService = inject(StorageService);

  public async getWeight(): Promise<number> {
    return await this.storageService.get("weight");
  }

  public async getHeight(): Promise<number> {
    return await this.storageService.get("height");
  }

  public async getDailyCaloriesGoal(): Promise<number> {
    return await this.storageService.get("dailyCaloriesGoal");
  }

  public async getWeightGoal(): Promise<number> {
    return await this.storageService.get("weightGoal");
  }

  public async setWeight(newWeight: number): Promise<void> {
    await this.storageService.set("weight", newWeight);
    this.profileChanged$.next();
  }

  public async setHeight(newHeight: number): Promise<void> {
    await this.storageService.set("height", newHeight);
    this.profileChanged$.next();
  }

  public async setDailyCaloriesGoal(newGoal: number): Promise<void> {
    await this.storageService.set("dailyCaloriesGoal", newGoal);
    this.profileChanged$.next();
  }

  public async setWeightGoal(newGoal: number): Promise<void> {
    await this.storageService.set("weightGoal", newGoal);
    this.profileChanged$.next();
  }

  public async removeHeight(): Promise<void> {
    await this.storageService.remove("height");
    this.profileChanged$.next();
  }

  public async removeDailyCaloriesGoal(): Promise<void> {
    await this.storageService.remove("dailyCaloriesGoal");
    this.profileChanged$.next();
  }

  public async removeWeight(): Promise<void> {
    await this.storageService.remove("weight");
    this.profileChanged$.next();
  }

  public async removeWeightGoal(): Promise<void> {
    await this.storageService.remove("weightGoal");
    this.profileChanged$.next();
  }

  public async resetProfile(): Promise<void> {
    await this.storageService.remove("weight");
    await this.storageService.remove("height");
    await this.storageService.remove("dailyCaloriesGoal");
    await this.storageService.remove("weightGoal");
    this.profileChanged$.next();
  }

  public onProfileChange = () => this.profileChanged$.asObservable();

}
