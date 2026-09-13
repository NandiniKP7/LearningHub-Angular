# 1. Angular Application Setup & Architecture

## Subtopics
- Angular CLI
- `ng new` / `ng serve`
- SPA startup flow
- `index.html`
- `main.ts`
- `bootstrapApplication`
- root component
- `app.config.ts`
- `angular.json`
- `package.json`
- `src/`
- `public/`
- project structure

## What it solves

Before learning Angular features, you need to know **where the app starts and where code belongs**.

Angular gives us a project structure so different files have clear jobs.

## Where do we use this?

| Place | Job |
|---|---|
| Terminal | Create and run the app |
| `src/index.html` | Browser's starting HTML page |
| `src/main.ts` | Starts Angular |
| Root component | First Angular component |
| `app.config.ts` | App-wide configuration |
| `angular.json` | Build/workspace settings |
| `package.json` | Packages and npm scripts |
| `src/` | Application source code |
| `public/` | Static files such as images and Markdown |

## Create and run an Angular app

```bash
ng new developer-learning-hub
cd developer-learning-hub
npm install
ng serve
```

Usually the app runs at:

```text
http://localhost:4200
```

`ng serve` starts the development server and rebuilds when source files change.

## Basic project structure

```text
developer-learning-hub/
├── angular.json
├── package.json
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

## How Angular starts

```text
Browser
  ↓
index.html
  ↓
main.ts
  ↓
bootstrapApplication(...)
  ↓
Root component
  ↓
Root template
  ↓
UI appears
```

### `index.html`

```html
<body>
  <app-root></app-root>
</body>
```

`<app-root>` is the host where Angular places the root component.

### `main.ts`

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app.component';

bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));
```

`bootstrapApplication()` starts the standalone Angular application.

### `app.config.ts`

```ts
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: []
};
```

App-wide features such as routing and HTTP providers can be added here.

### Root component

```ts
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  title = 'My App';
}
```

The component connects TypeScript, HTML, and CSS.

## Common mistakes
- Putting all application logic in the root component.
- Editing `node_modules/`.
- Expecting files inside `public/` to be imported like TypeScript files.
- Forgetting that CLI-generated filenames can vary slightly by Angular version.

## Quick reference

```text
Create app        → ng new
Run app           → ng serve
Browser entry     → src/index.html
Angular entry     → src/main.ts
App-wide config   → app.config.ts
Packages/scripts  → package.json
Build settings    → angular.json
Static files      → public/
```

## Memory rule

**Browser → `index.html` → `main.ts` → root component → UI**
