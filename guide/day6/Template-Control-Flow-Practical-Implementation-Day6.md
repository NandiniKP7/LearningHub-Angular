# Day 6 — Practical Implementation: Template Control Flow

## Before Today

The Learning Hub already had:

```text
Developer Learning Hub
[Angular] [TypeScript] [C#]

Angular image
Angular topic names
Current Goal input
```

The technology buttons already used Event Binding to change `selectedTopic`.

---

# Today's Task

Use Template Control Flow to:

```text
1. Show the correct technology content with @if / @else if / @else
2. Store Angular topics in a topics array
3. Display the topics with @for
4. Use track
5. Number the topics with $index
6. Use @empty as the fallback for an empty topics array
7. Style the Angular topics as a compact numbered button list
```

---

# Full `app.component.ts`

```typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularTopicsComponent } from './angular-topics/angular-topics.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AngularTopicsComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  title = "Developer Learning Hub";
  disabledButton = false;

  selectedTopic = "";

  angularTopics() {
    this.selectedTopic = "AngularBasics";
  }

  typeScriptTopics() {
    this.selectedTopic = "TypeScriptBasics";
  }

  cSharpTopics() {
    this.selectedTopic = "C#Basics";
  }

  topic = "Learn Angular";
}
```

---

# Full `app.component.html`

```html
<h1>{{title }}</h1>

<button [disabled]="disabledButton" (click)="angularTopics()">Angular</button>
<button [disabled]="disabledButton" (click)="typeScriptTopics()">TypeScript</button>
<button [disabled]="disabledButton" (click)="cSharpTopics()">C#</button>

<!-- ⭐ DAY 6 — TEMPLATE CONTROL FLOW -->
@if(selectedTopic==="AngularBasics")
{
  <app-angular-topics></app-angular-topics>
}
@else if(selectedTopic==="C#Basics")
{
  <p>Learn C#</p>
}
@else if(selectedTopic==="TypeScriptBasics")
{
  <p>Learn TypeScript</p>
}
@else
{
  <p>Please Select a topic</p>
}

<h3>What do you want to learn</h3>

<input [(ngModel)]="topic">

<p>Current Goal:{{topic}}</p>
```

---

# Important — Matching Value

The value stored in TypeScript must match the value checked by the condition.

```typescript
this.selectedTopic = "AngularBasics";
```

```html
@if(selectedTopic === "AngularBasics")
```

```text
"AngularBasics"
      ↕
   MUST MATCH
      ↕
"AngularBasics"
```

The visible button text does not have to match.

---

# Full `angular-topics.component.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-angular-topics',
  imports: [],
  templateUrl: './angular-topics.component.html',
  styleUrl: './angular-topics.component.css',
})
export class AngularTopicsComponent {
  title = "Angular Topics";
  imageUrl = "/Angular.png";

  // ⭐ DAY 6 — ADDED TOPICS ARRAY
  topics = [
    "Angular Application Setup & Architecture",
    "String Interpolation",
    "Components",
    "Property Binding",
    "Event Binding",
    "Two-Way Binding",
    "Angular Template Control Flow",
    "Parent → Child Communication with input()",
    "Child → Parent Communication with output()",
    "Writable Signals",
    "Computed Signals",
    "Signal Inputs",
    "Signal-Based State Changes",
    "effect()",
    "TypeScript Models / Interfaces in Angular",
    "Pipes",
    "Custom Pipes",
    "Services",
    "Dependency Injection",
    "Sharing Data / State with Services",
    "Routing",
    "Route Parameters & Navigation",
    "Forms Fundamentals",
    "Template-Driven Forms",
    "Reactive Forms",
    "Form Validation",
    "HTTP Client",
    "Calling REST APIs",
    "Loading, Error & Empty States",
    "RxJS Fundamentals",
    "Observables & Subscriptions",
    "Signals and RxJS Together",
    "Component Lifecycle",
    "Reusable Component Design",
    "Angular Application Structure",
    "Testing Angular Components & Services",
    "Build a Feature Independently",
    "linkedSignal()",
    "Route Guards — Basics",
    "HTTP Interceptors — Basics",
    "Change Detection & Performance Basics",
    "Deferred Loading",
    "Accessibility Basics",
    "Build & Deployment Basics"
  ];
}
```

---

# Full `angular-topics.component.html`

```html
<section class="topics-section">

  <div class="topics-header">
    <img
      class="angular-logo"
      [src]="imageUrl"
      alt="Angular logo">

    <h1>{{ title }}</h1>
  </div>

  <!-- ⭐ DAY 6 — @for / track / $index / @empty -->
  <div class="topics-grid">

    @for (topic of topics; track topic; let i = $index) {
      <button class="topic-card">
        <span class="topic-number">{{ i + 1 }}</span>
        <span>{{ topic }}</span>
      </button>
    } @empty {
      <p>No Angular topics available.</p>
    }

  </div>

</section>
```

---

# Full `angular-topics.component.css`

```css
.topics-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.topics-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.angular-logo {
  width: 45px;
  height: 45px;
  object-fit: contain;
}

.topics-header h1 {
  margin: 0;
  font-size: 30px;
}

/* ⭐ DAY 6 — COMPACT NUMBERED TOPIC LIST */
.topics-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.topic-card {
  width: 100%;
  padding: 10px 14px;

  display: flex;
  align-items: center;
  gap: 12px;

  border: 1px solid #dddddd;
  border-radius: 8px;
  background: white;

  text-align: left;
  font-size: 15px;
  cursor: pointer;
}

.topic-card:hover {
  background: #f7f7f7;
}

.topic-number {
  width: 28px;
  height: 28px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background: #f0f0f0;

  font-size: 13px;
  font-weight: 700;
}
```

---

# `$index`

`$index` starts at `0`.

We wanted the UI sequence to start at `1`, so:

```html
let i = $index
```

and:

```html
{{ i + 1 }}
```

---

# `@switch` — Practice Reference Only

We practiced how the existing `@if / @else if / @else` logic could also be written with:

```html
@switch (selectedTopic) {

  @case ("AngularBasics") {
    <app-angular-topics></app-angular-topics>
  }

  @case ("C#Basics") {
    <p>Learn C#</p>
  }

  @case ("TypeScriptBasics") {
    <p>Learn TypeScript</p>
  }

  @default {
    <p>Please Select a topic</p>
  }
}
```

> `@switch` was practice only. We did **not** replace the working `@if / @else if / @else` code in the project.

The same matching rule applies:

```text
selectedTopic = "AngularBasics"
                    ↕
                 MATCH
                    ↕
@case ("AngularBasics")
```

---

# Result

Today the Learning Hub moved from hard-coded topic paragraphs to:

```text
Technology button
      ↓
@if / @else if / @else
      ↓
AngularTopicsComponent
      ↓
topics[]
      ↓
@for + track + $index
      ↓
compact numbered topic buttons
```

Template Control Flow practiced today:

```text
@if
@else if
@else
@for
track
$index
@empty

@switch / @case / @default
→ practice reference
```
