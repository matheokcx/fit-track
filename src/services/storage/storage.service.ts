import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

// ==============================================


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public constructor(private storage: Storage) {
    this.init();
  }

  public async init(): Promise<void> {
    await this.storage.create();
    await this.storage.defineDriver(CordovaSQLiteDriver);
  }

  public async set(key: string, value: any): Promise<void> {
    await this.storage.set(key, value);
  }

  public async get(key: string): Promise<any> {
    return await this.storage.get(key);
  }

  public async remove(key: string): Promise<void> {
    await this.storage.remove(key);
  }

  public async clear(): Promise<void> {
    await this.storage.clear();
  }

}
