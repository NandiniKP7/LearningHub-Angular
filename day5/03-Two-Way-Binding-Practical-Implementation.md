# Day 5 — Practical Implementation: Two-Way Binding

## What We Wanted to Accomplish

Continue building the **Developer Learning Hub** and add an editable learning goal.

The goal was:

```text
Learning Goal input
      ⇅
TypeScript property
      ↓
Current Goal displayed on screen
```

When the user changes the input, the displayed goal should update immediately without clicking a button.

---

# Before Day 5

The Learning Hub already had:

```text
Developer Learning Hub

[Angular] [TypeScript] [C#]

Selected Topic

Angular Topics
```

We had already used:

```text
Interpolation
Property Binding
Event Binding
```

The technology buttons were connected to TypeScript methods.

---

# Step 1 — Import `FormsModule`

To use `[(ngModel)]`, we added:

```typescript
import { FormsModule } from '@angular/forms';
```

Then added `FormsModule` to the component imports:

```typescript
imports: [RouterOutlet, AngularTopicsComponent, FormsModule]
```

This makes `ngModel` available in the template.

---

# Step 2 — Add the Learning Goal Property

In `app.component.ts` we added:

```typescript
topic = "Learn Angular";
```

This is the value used by the input.

Initially:

```text
topic
  ↓
"Learn Angular"
```

---

# Step 3 — Add Two-Way Binding

In `app.component.html`:

```html
<input [(ngModel)]="topic">
```

This connects the input and the `topic` property in both directions:

```text
TypeScript topic
      ⇅
HTML input
```

Initially, TypeScript sends:

```text
Learn Angular
```

to the input.

When the user changes the input, Angular updates the same `topic` property.

---

# Step 4 — Display the Current Goal

We used interpolation:

```html
<p>Current Goal:{{topic}}</p>
```

Now:

```text
User types in input
        ↓
[(ngModel)]="topic"
        ↓
topic changes
        ↓
{{ topic }}
        ↓
Current Goal changes immediately
```

---

# Your `app.component.ts`

```typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularTopicsComponent } from './angular-topics/angular-topics.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AngularTopicsComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  title ="Developer Learning Hub"
  disabledButton =false

  selectedTopic =""
  topic="Learn Angular"

  angularTopics(){
    this.selectedTopic="Angular"
  }

  typeScriptTopics()
  {
    this.selectedTopic="TypeScriptBasics"
  }

  cSharpTopics()
  {
    this.selectedTopic="C# basics"
  }
}
```

---

# Your `app.component.html`

```html
<h1>{{title }}</h1>

<button [disabled]="disabledButton" (click)="angularTopics()">Angular</button>
<button [disabled]="disabledButton" (click)="typeScriptTopics()">TypeScript</button>
<button [disabled]="disabledButton" (click)="cSharpTopics()">C#</button>

<p>{{selectedTopic}}</p>

<input [(ngModel)]="topic">

<p>Current Goal:{{topic}}</p>

<app-angular-topics></app-angular-topics>
```

---

# What Day 5 Added

Before:

```text
Component data → HTML
User click → TypeScript method
```

Now:

```text
Component property
      ⇅
HTML input
```

The important new code was:

```typescript
import { FormsModule } from '@angular/forms';
```

```typescript
topic = "Learn Angular";
```

```html
<input [(ngModel)]="topic">
```

```html
<p>Current Goal:{{topic}}</p>
```

---

# How the Three Binding Concepts Connect

## Interpolation

```html
{{ topic }}
```

```text
TypeScript → displayed text
```

## Property Binding

```html
[disabled]="disabledButton"
```

```text
TypeScript → HTML property
```

## Event Binding

```html
(click)="angularTopics()"
```

```text
User/HTML → TypeScript method
```

## Two-Way Binding

```html
[(ngModel)]="topic"
```

```text
TypeScript ⇄ HTML input
```

---

# Final Day 5 Flow

```text
topic = "Learn Angular"
        ↓
input displays Learn Angular

User edits input
        ↓
[(ngModel)]
        ↓
topic changes automatically
        ↓
{{ topic }}
        ↓
Current Goal updates
```

# Result

Day 5 added **Two-Way Binding** to the Learning Hub.

The application can now keep an HTML input and a TypeScript component property synchronized in both directions.
