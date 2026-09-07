# 1. Angular Application Setup & Architecture

## What is Angular?

Angular is a framework for building web applications using TypeScript,
HTML, and CSS. A typical Angular application is a single-page
application (SPA): the browser loads an initial page, and Angular
manages the UI and navigation without loading a completely new HTML page
for every view.

**Memory:** Angular manages the application inside one browser page.

## 1. Create an application

Angular CLI provides commands to create, run, build, and generate
Angular projects.

``` bash
ng new developer-learning-hub
```

If the CLI is not installed globally, use
`npx @angular/cli new developer-learning-hub`. The CLI asks
configuration questions and creates the project folder. Generated files
vary by Angular version and selected options.

## 2. Run the application

``` bash
cd developer-learning-hub
npm install
ng serve
```

`npm install` installs dependencies if needed. `ng serve` starts the
development server and rebuilds when source files change. Open the
address printed by the CLI, normally `http://localhost:4200`. Press
`Ctrl + C` to stop the server.

## 3. Explore the project structure

``` text
developer-learning-hub/
├── angular.json
├── package.json
├── package-lock.json
├── node_modules/
├── public/
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.css
    └── app/
        ├── app.component.ts
        ├── app.component.html
        ├── app.component.css
        └── app.config.ts
```

Newer CLI versions may use `app.ts`, `app.html`, and `app.css` instead.
The roles remain the same.

  -----------------------------------------------------------------------
  File/folder                         Purpose
  ----------------------------------- -----------------------------------
  `package.json`                      Dependencies and npm scripts.

  `package-lock.json`                 Exact dependency versions for
                                      reproducible installs.

  `node_modules/`                     Installed packages; normally not
                                      committed to Git.

  `angular.json`                      Workspace, build, serve, and asset
                                      configuration.

  `src/`                              Application source code.

  `public/`                           Static assets such as images.

  `src/styles.css`                    Global application styles.

  `src/app/`                          Components and other Angular code.
  -----------------------------------------------------------------------

## 4. How does Angular start?

``` text
Browser requests application
        ↓
index.html
        ↓
main.ts (JavaScript entry point)
        ↓
bootstrapApplication(AppComponent, appConfig)
        ↓
AppComponent
        ↓
Root component template
        ↓
Browser displays the Angular UI
```

The build system loads the application JavaScript. You do not manually
add a script tag for every component.

## 5. Understand each startup file

### index.html --- the browser's initial page

``` html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>My App</title>
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

The browser loads this page. `<app-root>` is the host element where
Angular mounts the root component.

### main.ts --- starts Angular

``` ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

-   `bootstrapApplication` starts the standalone Angular application.
-   `AppComponent` identifies the root component.
-   `appConfig` supplies application-wide configuration.
-   `.catch(...)` reports a startup error.

Some newer projects use `App` from `./app/app` instead. The role is the
same.

### app.config.ts --- application-wide configuration

``` ts
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: []
};
```

`providers` configures application-wide services/features. Routing and
HTTP can add providers here later. You do not need to understand
dependency injection yet.

### Root component --- the first Angular component

``` ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'My App';
}
```

The decorator connects the TypeScript class with its HTML and CSS. The
selector matches the host element in `index.html`.

### Root component HTML --- visible UI

``` html
<h1>{{ title }}</h1>
```

Angular reads `title` from the component class and displays its value.
String interpolation is covered in Topic 2.

## 6. Where do other components fit?

The root is the starting component, not necessarily the component
containing every page. Other components can be composed into the UI or
displayed through routing.

``` text
Root Component
      ↓
Other UI components
      ↓
Their templates and styles
```

Component creation is covered in Topic 3. Routing is covered later.

## Quick reference

  Want to...                     Remember
  ------------------------------ -----------------------
  Create a project               `ng new project-name`
  Run a project                  `ng serve`
  Install dependencies           `npm install`
  Find the browser entry page    `src/index.html`
  Find Angular's entry point     `src/main.ts`
  Find the root component        `src/app/`
  Configure app-wide providers   `app.config.ts`
  Find packages/scripts          `package.json`
  Find build settings            `angular.json`
  Find static assets             `public/`

**Memory rule:** Create → Run → Explore files → Browser page → `main.ts`
→ Root component → UI.
