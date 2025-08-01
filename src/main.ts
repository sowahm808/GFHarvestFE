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
import { defineCustomElements as defineIonIcons } from 'ionicons/dist/loader';
import {
  calendarOutline,
  helpOutline,
  createOutline,
  listOutline,
  schoolOutline,
  happyOutline,
  homeOutline,
  logOutOutline,
  personAddOutline,
  trophyOutline,
  timeOutline,
  giftOutline,
  chatbubbleEllipsesOutline,
  menuOutline,
  menu,
} from 'ionicons/icons';
import { AuthInterceptor } from './app/services/auth.interceptor';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

defineIonIcons(window);

addIcons({
  'calendar-outline': calendarOutline,
  'help-outline': helpOutline,
  'create-outline': createOutline,
  'list-outline': listOutline,
  'school-outline': schoolOutline,
  'happy-outline': happyOutline,
  'home-outline': homeOutline,
  'log-out-outline': logOutOutline,
  'person-add-outline': personAddOutline,
  'trophy-outline': trophyOutline,
  'time-outline': timeOutline,
  'gift-outline': giftOutline,
  'chatbubble-ellipses-outline': chatbubbleEllipsesOutline,
  'menu-outline': menuOutline,
  'menu': menu,
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
