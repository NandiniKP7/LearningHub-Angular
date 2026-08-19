# Day 9 — Writable Signals Implementation

## What We Changed

The Learning Hub used a normal property to track the selected technology:

```typescript
selectedTechnology = "";
```

We changed this state to a writable signal because its value changes when the user selects Angular, TypeScript, or C#.

## 1. Create the Signal

```typescript
import { Component, signal } from '@angular/core';

selectedTechnology = signal('');
```

```text
selectedTechnology → signal
'' → initial value
```

## 2. Change the Signal with `.set()`

```typescript
angularTopics() {
  this.selectedTechnology.set('AngularBasics');
  this.selectedLearningTopicNotes = '';
}

typeScriptTopics() {
  this.selectedTechnology.set('TypeScriptBasics');
}

cSharpTopics() {
  this.selectedTechnology.set('C#Basics');
}
```

We use `.set()` because we know the exact new value.

```text
Angular click    → .set("AngularBasics")
TypeScript click → .set("TypeScriptBasics")
C# click         → .set("C#Basics")
```

## 3. Read the Signal in HTML

A normal property was read like:

```html
@if (selectedTechnology === "AngularBasics") {
```

A signal is read using `()`:

```html
@if (selectedTechnology() === "AngularBasics") {
```

Relevant template:

```html
@if (selectedTechnology() === "AngularBasics") {

  @if (selectedLearningTopicNotes === "") {

    <app-angular-topics
      (selectedLearningTopic)="selectedLearningTopicNotes = $event">
    </app-angular-topics>

  }
  @else {

    <app-topic-notes
      [topicNotes]="selectedLearningTopicNotes">
    </app-topic-notes>

  }

}
@else if (selectedTechnology() === "C#Basics") {
  <p>Learn C#</p>
}
@else if (selectedTechnology() === "TypeScriptBasics") {
  <p>Learn TypeScript</p>
}
@else {
  <p>Please select a technology</p>
}
```

## 4. Complete Flow

```text
User clicks Angular
        ↓
angularTopics()
        ↓
selectedTechnology.set("AngularBasics")
        ↓
selectedTechnology()
→ "AngularBasics"
        ↓
@if reads selectedTechnology()
        ↓
AngularTopicsComponent appears
```

## 5. Why `selectedTechnology` Is a Good Signal

```text
selectedTechnology
→ changes while app is running
→ UI depends on its value
→ good signal candidate
```

The value can change:

```text
""
↓
"AngularBasics"
↓
"TypeScriptBasics"
↓
"C#Basics"
```

## 6. Why We Left `angularLearningTopics` as a Normal Array

Currently the topic list is hard-coded and does not change while the app is running.

```typescript
angularLearningTopics = [
  "Components",
  "Property Binding",
  "Event Binding"
];
```

```text
angularLearningTopics[]
→ currently static
→ normal array is fine
```

Later, when topics come from an API, we can reconsider:

```typescript
angularLearningTopics = signal<string[]>([]);
```

When an API returns the full list:

```typescript
this.angularLearningTopics.set(apiTopics);
```

The template would then read:

```html
@for (angularLearningTopic of angularLearningTopics(); track angularLearningTopic) {
  ...
}
```

## 7. Where `.update()` Fits

We did not force `.update()` into this implementation.

`selectedTechnology` is better with `.set()` because we know the exact replacement value.

A future example:

```typescript
completedTopics = signal(0);

completeTopic() {
  this.completedTopics.update(current => current + 1);
}
```

```text
current = 3
↓
current + 1
↓
new value = 4
```

Future array example:

```typescript
this.angularLearningTopics.update(current => [
  ...current,
  newTopic
]);
```

## 8. `.set()` vs `.update()`

```text
Do I know the exact new value?
→ .set()

Does the new value depend on the current value?
→ .update()
```

For our implementation:

```text
selectedTechnology
→ .set() ✅
```

## Final `app.component.ts`

```typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AngularTopicsComponent } from './angular-topics/angular-topics.component';
import { TopicNotes } from './topic-notes/topic-notes.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, AngularTopicsComponent, TopicNotes],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App {
  title = 'Developer Learning Hub';

  disabledButton = false;

  selectedTechnology = signal('');

  selectedLearningTopicNotes = '';

  technology = 'Learn Angular';

  angularTopics() {
    this.selectedTechnology.set('AngularBasics');
    this.selectedLearningTopicNotes = '';
  }

  typeScriptTopics() {
    this.selectedTechnology.set('TypeScriptBasics');
  }

  cSharpTopics() {
    this.selectedTechnology.set('C#Basics');
  }
}
```

## Quick Memory Rules

```text
signal('')
→ create reactive state

selectedTechnology()
→ read signal

selectedTechnology.set("AngularBasics")
→ replace signal value
```

```text
.set()
→ exact new value

.update()
→ new value depends on current value
```

```text
Changing data that affects UI
→ good signal candidate

Static data that currently never changes
→ does not need to become a signal
```

## Day 9 Result

```text
Technology button clicked
        ↓
.set(...)
        ↓
selectedTechnology signal changes
        ↓
template reads selectedTechnology()
        ↓
@if / @else selects correct view
        ↓
UI reacts to selected technology
```
