# Day 8 — Practical Implementation: Child → Parent with `output()`

## Before Today

The Learning Hub already had:

```text
App
→ Angular button
→ AngularTopicsComponent
→ topics[]
→ @for
→ TopicCardComponent
```

`TopicCardComponent` already received each topic with:

```text
[topic]="topic"
        ↓
input.required<string>()
```

---

# Today's Task

When a topic is clicked:

```text
TopicCardComponent
      ↓
output()
      ↓
AngularTopicsComponent
      ↓
output()
      ↓
App
      ↓
TopicNotesComponent
```

The Angular topic list should disappear when notes are displayed.

Clicking **Angular again** should show the topic list again.

---

# New `TopicNotesComponent`

## `topic-notes.component.ts`

```typescript
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-topic-notes',
  imports: [],
  templateUrl: './topic-notes.component.html',
  styleUrl: './topic-notes.component.css',
})
export class TopicNotes {
  // ⭐ TODAY
  topicNotes = input.required<string>();
}
```

## `topic-notes.component.html`

```html
<p>topic-notes works!</p>
<h1>{{ topicNotes() }}</h1>
```

For now this proves that the selected topic reaches the notes component. README content will be added later.

---

# Updated `TopicCardComponent`

## `topic-card.component.ts`

```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-topic-card',
  imports: [],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css',
})
export class TopicCard {

  // PREVIOUS — Parent → Child
  topic = input.required<string>();

  // ⭐ TODAY — Child → Parent
  selectedTopic = output<string>();

  // ⭐ TODAY
  onSelectedTopic() {
    this.selectedTopic.emit(this.topic());
  }
}
```

## `topic-card.component.html`

```html
<button class="topic-card" (click)="onSelectedTopic()">
  <span>{{ topic() }}</span>
</button>
```

Flow:

```text
click
  ↓
onSelectedTopic()
  ↓
selectedTopic.emit(topic())
```

Important:

```text
selectedTopic = output<string>()
→ creates output channel

emit(this.topic())
→ sends clicked topic
```

---

# Updated `AngularTopicsComponent`

The topic card emits the clicked topic to `AngularTopicsComponent`.

## Important additions in `angular-topics.component.ts`

```typescript
import { Component, output } from '@angular/core';
import { TopicCard } from "../topic-card/topic-card.component";

@Component({
  selector: 'app-angular-topics',
  imports: [TopicCard],
  templateUrl: './angular-topics.component.html',
  styleUrl: './angular-topics.component.css',
})
export class AngularTopicsComponent {

  title = "Angular Topics";
  imageUrl = "/Angular.png";

  // existing topics[] remains here

  // ⭐ TODAY
  selectedTopic = output<string>();

  // ⭐ TODAY
  onTopicSelected(topic: string) {
    this.selectedTopic.emit(topic);
  }
}
```

The existing `topics[]` array stays unchanged.

## `angular-topics.component.html`

```html
<h1>{{ title }}</h1>

@for (topic of topics; track topic; let i = $index) {

  <div class="topic-row">

    <span class="topic-number">
      {{ i + 1 }}
    </span>

    <app-topic-card
      [topic]="topic"
      (selectedTopic)="onTopicSelected($event)">
    </app-topic-card>

  </div>

} @empty {

  <p>No Angular topics available.</p>

}
```

---

# First Output Connection

```text
TopicCardComponent
      ↓
selectedTopic.emit(topic())
      ↓
AngularTopicsComponent HTML
(selectedTopic)="onTopicSelected($event)"
      ↓
$event
      ↓
AngularTopicsComponent TS
onTopicSelected(topic)
```

---

# App Owns Selected Notes State

The Angular button lives in `App`, and `App` controls the main view.

So `App` owns:

```typescript
selectedTopicNotes = "";
```

The Angular button resets it:

```typescript
angularTopics() {
  this.selectedTopic = "AngularBasics";
  this.selectedTopicNotes = "";
}
```

---

# Updated Angular View in `app.component.html`

We originally rendered `AngularTopicsComponent` twice. The fix was to keep **one Angular section** and switch between the topic list and notes inside it.

```html
@if (selectedTopic === "AngularBasics") {

  @if (selectedTopicNotes === "") {

    <app-angular-topics
      (selectedTopic)="selectedTopicNotes = $event">
    </app-angular-topics>

  }
  @else {

    <app-topic-notes
      [topicNotes]="selectedTopicNotes">
    </app-topic-notes>

  }

}
@else if (selectedTopic === "C#Basics") {

  <p>Learn C#</p>

}
@else if (selectedTopic === "TypeScriptBasics") {

  <p>Learn TypeScript</p>

}
@else {

  <p>Please select a topic</p>

}
```

---

# Second Output Connection

```text
AngularTopicsComponent
      ↓
selectedTopic.emit(topic)
      ↓
App listens
(selectedTopic)="selectedTopicNotes = $event"
      ↓
App stores clicked topic
```

Example:

```text
$event = "Components"

selectedTopicNotes = "Components"
```

---

# Why `@if / @else` Matters

Before clicking a topic:

```text
selectedTopicNotes = ""
      ↓
show AngularTopicsComponent
```

After clicking `Components`:

```text
selectedTopicNotes = "Components"
      ↓
hide AngularTopicsComponent
      ↓
show TopicNotesComponent
```

The Angular topic list is therefore **not displayed behind or below the notes**.

---

# Clicking Angular Again

```typescript
angularTopics() {
  this.selectedTopic = "AngularBasics";
  this.selectedTopicNotes = "";
}
```

Flow:

```text
Notes displayed
      ↓
click Angular
      ↓
selectedTopicNotes = ""
      ↓
notes disappear
      ↓
Angular topic list returns
```

---

# Complete Flow

```text
Click Angular
      ↓
AngularTopicsComponent
      ↓
TopicCardComponent
      ↓
click "Components"
      ↓
selectedTopic.emit("Components")
      ↓
AngularTopicsComponent receives $event
      ↓
AngularTopicsComponent emits "Components"
      ↓
App receives $event
      ↓
selectedTopicNotes = "Components"
      ↓
@if / @else
      ↓
TopicNotesComponent
      ↓
[topicNotes]="selectedTopicNotes"
      ↓
topicNotes()
```

Then:

```text
Click Angular again
      ↓
selectedTopicNotes = ""
      ↓
Angular topic list returns
```

---

# Component Responsibilities

```text
App
→ controls main Learning Hub view
→ owns selectedTopicNotes
→ resets Angular view

AngularTopicsComponent
→ owns Angular topics[]
→ displays Angular topic list
→ forwards selected topic to App

TopicCardComponent
→ reusable topic button
→ receives topic with input()
→ emits clicked topic with output()

TopicNotesComponent
→ reusable notes UI
→ receives selected topic with input()
```

`TopicCardComponent` and `TopicNotesComponent` can later be reused for Angular, TypeScript, and C# / .NET.

---

# Important Learning Points

```text
input()
Parent → Child

output()
Child → Parent

emit(value)
→ sends value

$event
→ receives emitted value

@if / @else
→ switches list view and notes view
```

Output names must match:

```text
Child:
selectedTopic = output<string>()

Parent:
(selectedTopic)="..."
```

---

# Result

Before:

```text
Click topic
→ console.log(topic)
```

After:

```text
Click topic
→ output()
→ App receives selected topic
→ topic list disappears
→ TopicNotesComponent appears

Click Angular again
→ selected topic resets
→ Angular topic list returns
```
