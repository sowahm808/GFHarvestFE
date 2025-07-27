import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  helpOutline,
  createOutline,
  listOutline,
  homeOutline,
  logOutOutline,
  personAddOutline,
  trophyOutline,
  timeOutline,
  giftOutline,
  chatbubbleEllipsesOutline,
} from 'ionicons/icons';
import { AuthInterceptor } from './app/services/auth.interceptor';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

addIcons({
  calendarOutline,
  helpOutline,
  createOutline,
  listOutline,
  homeOutline,
  logOutOutline,
  personAddOutline,
  trophyOutline,
  timeOutline,
  giftOutline,
  chatbubbleEllipsesOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(HttpClientModule),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
});
