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

  public async getAge(): Promise<number> {
    return await this.storageService.get("age");
  }

  public async getWeightGoal(): Promise<number> {
    return await this.storageService.get("weightGoal");
  }

  public async getWaterConsomation(): Promise<number> {
    return await this.storageService.get("waterConsomation");
  }

  public async setWeight(newWeight: number): Promise<void> {
    await this.storageService.set("weight", newWeight);
    this.profileChanged$.next();
  }

  public async setHeight(newHeight: number): Promise<void> {
    await this.storageService.set("height", newHeight);
    this.profileChanged$.next();
  }

  public async setWeightGoal(newGoal: number): Promise<void> {
    await this.storageService.set("weightGoal", newGoal);
    this.profileChanged$.next();
  }

  public async setAge(newAge: number): Promise<void> {
    await this.storageService.set("age", newAge);
    this.profileChanged$.next();
  }

  public async setWaterConsomation(newWaterConso: number): Promise<void> {
    await this.storageService.set("waterConsomation", newWaterConso);
    this.profileChanged$.next();
  }

  public async resetProfile(): Promise<void> {
    await this.storageService.remove("weight");
    await this.storageService.remove("height");
    await this.storageService.remove("weightGoal");
    await this.storageService.remove("age");
    await this.storageService.remove("waterConsomation");
    this.profileChanged$.next();
  }

  public onProfileChange = () => this.profileChanged$.asObservable();

}
