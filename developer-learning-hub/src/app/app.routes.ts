import { Routes } from '@angular/router';
import { AngularTopicsComponent } from './angular-topics/angular-topics.component';
import { TypescriptTopicsComponent } from './typescript-topics/typescript-topics.component';
import { CsharpTopicsComponent } from './csharp-topics/csharp-topics.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {
    path:'',
    redirectTo:'angular',
    pathMatch:'full'
    },
    {
        path:'angular',
        component :AngularTopicsComponent
    },
     {
        path:'typescript',
        component :TypescriptTopicsComponent
    },
     {
        path:'csharp',
        component :CsharpTopicsComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
