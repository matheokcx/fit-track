import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import {Drivers} from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import {importProvidersFrom} from "@angular/core";
import {IonicStorageModule} from "@ionic/storage-angular";


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    importProvidersFrom(IonicStorageModule.forRoot({
      name: 'fitTrackDatabase',
      driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB]
    })),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
