import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideMarkdown } from 'ngx-markdown';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {

  providers: [

    provideBrowserGlobalErrorListeners(),

    provideRouter(routes), // provides our Angular routes

    provideHttpClient(), // allows Angular to load the .md file

    provideMarkdown({
      loader: HttpClient // ngx-markdown uses HttpClient to read the file
    }),

  ]

};