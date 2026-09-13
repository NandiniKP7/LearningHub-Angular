import { Routes } from '@angular/router'; // Type for Angular route configuration.

import { NotFoundComponent } from './not-found/not-found.component'; // Shown when no route matches.

// URL -> component Angular should load.
export const routes: Routes = [

  {
    path: 'angular', // localhost:4200/angular

    // Lazy loads AngularTopicsComponent only when /angular is visited.
    loadComponent: () =>
      import('./angular-topics/angular-topics.component')
        .then((m) => m.AngularTopicsComponent),
  },

  {
    // :topic is a dynamic route parameter.
    // Example: localhost:4200/angular/topic/routing
    path: 'angular/topic/:topic',

    // Lazy loads TopicNotes when this route is visited.
    loadComponent: () =>
      import('./topic-notes/topic-notes.component')
        .then((m) => m.TopicNotes),
  },

  {
    path: 'typescript', // localhost:4200/typescript

    loadComponent: () =>
      import('./typescript-topics/typescript-topics.component')
        .then((m) => m.TypescriptTopicsComponent),
  },

  {
    path: 'csharp', // localhost:4200/csharp

    loadComponent: () =>
      import('./csharp-topics/csharp-topics.component')
        .then((m) => m.CsharpTopicsComponent),
  },

  {
    path: '**', // Matches any URL that did not match a route above.

    component: NotFoundComponent,
  },

];

// Route order matters because Angular checks routes from top to bottom.
// More specific routes should come before catch-all routes.
// '**' must stay last.
//
// Dynamic route:
// :topic captures part of the URL.
//
// Lazy loading:
// loadComponent() loads that component only when its route is visited.