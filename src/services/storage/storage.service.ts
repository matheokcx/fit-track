import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {BehaviorSubject} from "rxjs";
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

// ==============================================


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public constructor(private storage: Storage) {
    this.init();
  }

  protected async init() {
    await this.storage.create();
    await this.storage.defineDriver(CordovaSQLiteDriver);
  }

  async set(key: string, value: any): Promise<void> {
    await this.storage.set(key, value);
  }

  async get(key: string): Promise<any> {
    return this.storage.get(key);
  }

  protected async remove(key: string): Promise<void> {
    await this.storage.remove(key);
  }

  protected async clear(): Promise<void> {
    await this.storage.clear();
  }

  protected async keys(): Promise<string[] | undefined> {
    return await this.storage.keys();
  }

}
