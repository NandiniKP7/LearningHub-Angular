# How to Launch the Angular App + Angular Architecture

# Part 1 — Launch the Application

## What Are We Building?

Our project is:

```text
Developer Learning Hub
```

The first version will eventually display:

```text
Developer Learning Hub

Angular
TypeScript
C# / .NET
```

Before writing features, we need to know how to create and run the Angular application.

---

## 1. Verify Node.js and npm

Open Terminal:

```bash
node --version
npm --version
```

Both commands should return version numbers.

---

## 2. Install Angular CLI

If Angular CLI is not installed:

```bash
npm install -g @angular/cli
```

Verify it:

```bash
ng version
```

---

## 3. Create the Learning Hub

```bash
ng new developer-learning-hub
```

Then enter the project:

```bash
cd developer-learning-hub
```

Open it in VS Code:

```bash
code .
```

If the `code` command is unavailable, open VS Code and choose the project folder manually.

---

## 4. Launch Angular

```bash
ng serve
```

Angular CLI prints a local development URL. Open the URL shown in the terminal.

You can also use:

```bash
ng serve --open
```

This starts the development server and opens the application in a browser.

---

# Part 2 — Angular Application Architecture

## The Question

Before learning components, signals, services, routing, or APIs:

> How does our Angular application start and reach the browser?

Use this mental model:

```text
Browser
   ↓
index.html
   ↓
main.ts
   ↓
bootstrapApplication(AppComponent)
   ↓
AppComponent
   ↓
AppComponent HTML template
   ↓
Browser displays UI
```

---

## `index.html`

`index.html` is the host page loaded by the browser.

For now:

```text
Browser
   ↓
index.html
   ↓
Angular application is hosted in the page
```

We do not need to study every part of `index.html` yet.

---

## `main.ts`

`main.ts` is the Angular application entry point.

A modern Angular application commonly contains code conceptually like:

```typescript
bootstrapApplication(AppComponent);
```

Read it as:

```text
Start Angular
     ↓
Use AppComponent as the root component
```

### Important distinction

```text
index.html
→ hosts the application

main.ts
→ starts/bootstrap Angular
```

---

## `AppComponent`

`AppComponent` is the root component Angular starts with.

A component can look similar to:

```typescript
@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Developer Learning Hub';
}
```

Break the component into pieces:

```text
AppComponent
│
├── selector
│     identifies the component
│
├── templateUrl
│     points to its HTML template
│
├── styleUrl
│     points to its CSS
│
├── imports
│     dependencies used by the component
│
└── TypeScript class
      data + behavior
```

We are intentionally **not** introducing parent/child components here. We have not built a second component yet.

---

# TypeScript → Template → Browser

Suppose the component contains:

```typescript
title = 'Developer Learning Hub';
```

The HTML can display it:

```html
<h1>{{ title }}</h1>
```

Flow:

```text
AppComponent TypeScript
        │
        │ title
        ▼
AppComponent HTML
        │
        ▼
Browser
```

The `{{ title }}` syntax is **string interpolation** and has its own separate concept README.

---

# Files to Recognize

Generated filenames can differ slightly by Angular CLI version/configuration.

Conceptually:

```text
developer-learning-hub/
│
└── src/
    ├── index.html
    ├── main.ts
    │
    └── app/
        ├── root component TypeScript
        ├── root component HTML
        └── root component CSS
```

---

# Architecture Cheat Sheet

```text
index.html
→ host page

main.ts
→ Angular entry point

bootstrapApplication(...)
→ starts Angular with the root component

AppComponent
→ root component

TypeScript class
→ component data + behavior

HTML template
→ component UI

CSS
→ component styling

ng serve
→ starts Angular development server
```

---

# Common Confusions

## Is `index.html` the same as `main.ts`?

No.

```text
index.html → host
main.ts    → Angular startup/bootstrap
```

## Does the TypeScript class contain the HTML?

No.

The TypeScript class owns component data and behavior. The template defines the component's UI.

```text
TypeScript
    ↓
data / behavior

HTML
    ↓
presentation
```
