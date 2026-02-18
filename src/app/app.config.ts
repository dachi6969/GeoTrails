import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes,
      withPreloading(PreloadAllModules), // preload lazy-loaded routes but in background
      withInMemoryScrolling({
      scrollPositionRestoration: 'enabled', // renders new page from top: 0
    })),
    provideHttpClient(),
    provideAnimations(),
  ]
};
