import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    children: [],
  },
  {
    path: 'angular',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./angular-topics/angular-topics.component').then((m) => m.AngularTopicsComponent),
      },
      {
        path: 'topic/:topic',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./topic-notes/topic-notes.component').then((m) => m.TopicNotes),
          },
        ],
      },
    ],
  },
  {
    path: 'typescript',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./typescript-topics/typescript-topics.component').then(
            (m) => m.TypescriptTopicsComponent,
          ),
      },
    ],
  },
  {
    path: 'csharp',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./csharp-topics/csharp-topics.component').then((m) => m.CsharpTopicsComponent),
      },
    ],
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];
