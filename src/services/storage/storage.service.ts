import { Injectable } from '@angular/core';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import {Storage} from '@ionic/storage-angular';
import {BehaviorSubject} from "rxjs";

// ==============================================


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private workoutsChanged$ = new BehaviorSubject<void>(undefined);

  async init() {
    await this.storage.create();
    await this.storage.defineDriver(CordovaSQLiteDriver);
  }

  constructor(private storage: Storage) {
    this.init();
  }

  async set(key: string, value: any): Promise<void> {
    await this.storage.set(key, value);
    if (key === 'workouts') {
      this.workoutsChanged$.next();
    }
  }

  async get(key: string): Promise<any> {
    return this.storage.get(key);
  }

  async remove(key: string): Promise<void> {
    await this.storage.remove(key);
    if (key === 'workouts') {
      this.workoutsChanged$.next();
    }
  }

  async clear(): Promise<void> {
    await this.storage.clear();
    this.workoutsChanged$.next();
  }

  async keys(): Promise<string[] | undefined> {
    const keys = await this.storage.keys();
    return keys;
  }

  onWorkoutsChange() {
    return this.workoutsChanged$.asObservable();
  }

}
