import { Injectable } from '@angular/core';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import {Storage} from '@ionic/storage-angular';
import {muscles} from "../../models/exercise";
import {feelings} from "../../models/workout";

// ==============================================


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  async init() {
    await this.storage.create();
    await this.storage.defineDriver(CordovaSQLiteDriver);
  }

  constructor(private storage: Storage) {
    this.init();
  }

  async set(key: string, value: any): Promise<void> {
    await this.storage.set(key, value);
  }

  async get(key: string): Promise<any> {
    return this.storage.get(key);
  }

  async remove(key: string): Promise<void> {
    await this.storage.remove(key);
  }

  async clear(): Promise<void> {
    await this.storage.clear();
  }

  async keys(): Promise<string[] | undefined> {
    const keys = await this.storage.keys();
    return keys;
  }

}
