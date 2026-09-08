# Learning Hub — Practical Revision: Topics 7–9

**Historical lessons:** Day 6, Day 7, Day 8
**Revision:** September 8, 2026

This is a combined practical reference, not a new feature assignment. The original lessons used manual page switching before Angular Router was introduced. Do not restore that old architecture to the current application.

## How to use this file

Read one stage at a time. The important code and connections are shown below. The companion archive preserves the original full snapshots, including the 44-topic array and CSS, so nothing needs to be lost during folder cleanup.

## 1. Day 6 — Template Control Flow

### What we built

The root already had Angular, TypeScript, and C# buttons, an Angular image, topic names, and a Current Goal input. The technology buttons changed `selectedTopic`. Day 6 introduced conditional technology content and a numbered topic list.

### Root TypeScript

```ts
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
```

### Root HTML

```html
<button (click)="angularTopics()">Angular</button>
<button (click)="typeScriptTopics()">TypeScript</button>
<button (click)="cSharpTopics()">C#</button>

@if (selectedTopic === "AngularBasics") {
  <app-angular-topics></app-angular-topics>
} @else if (selectedTopic === "C#Basics") {
  <p>Learn C#</p>
} @else if (selectedTopic === "TypeScriptBasics") {
  <p>Learn TypeScript</p>
} @else {
  <p>Please select a topic</p>
}
```

The root imports AngularTopicsComponent. The stored string must match the condition exactly; the visible button text does not need to match.

**Flow:** Click Angular → `angularTopics()` → `selectedTopic` changes → `@if` matches → AngularTopicsComponent renders.

### AngularTopicsComponent

The historical component owned `title`, `imageUrl`, and the array of 44 topic strings. The complete array is preserved in the archive. Its original order is historical; the current roadmap is authoritative.

```ts
title = "Angular Topics";
imageUrl = "/Angular.png";

topics = [
  "Angular Application Setup & Architecture",
  "String Interpolation",
  "Components",
  // Remaining original topics are preserved in the archive.
];
```

### Repeated HTML

```html
<section class="topics-section">
  <div class="topics-header">
    <img class="angular-logo" [src]="imageUrl" alt="Angular logo">
    <h1>{{ title }}</h1>
  </div>

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

`topic` is the current string. `track topic` identifies it. `$index` starts at zero, so `i + 1` displays numbering from 1. `@empty` handles an empty array.

### CSS learned

The original CSS used a centered section, a flex-column list, small gaps, full-width buttons, and circular number badges. The complete CSS is in the archive. Important properties were `display: flex`, `flex-direction`, `gap`, `align-items`, `width`, `padding`, and `border-radius`.

### Switch practice

The original guide explicitly marked `@switch` as practice only. It did not replace the working `@if` implementation.

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
    <p>Please select a topic</p>
  }
}
```

**Original practical coverage:** `@if`, `@else if`, `@else`, `@for`, `track`, `$index`, `@empty`, and switch practice. `$first`, `$last`, `$even`, and `$odd` were not implemented in the original practical; they are covered in the revised concept README.

**Checkpoint:** Explain where the array lived, how Angular was selected, why `track` was used, and how numbering started at 1.

---

## 2. Day 7 — Parent → Child with input()

### What changed?

AngularTopicsComponent originally owned both the topic data and the button UI. We extracted a reusable TopicCard child without changing the visible list.

```text
AngularTopicsComponent (parent)
  ├── owns topics[]
  ├── repeats the list
  └── sends one topic
          ↓
TopicCard (child)
  ├── receives one topic
  └── owns button HTML/CSS
```

### Child TypeScript

```ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-topic-card',
  imports: [],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css',
})
export class TopicCard {
  topic = input.required<string>();
}
```

The parent must provide a string. The child reads the InputSignal but does not directly set it.

### Child HTML

```html
<button class="topic-card">
  <span>{{ topic() }}</span>
</button>
```

The original correction was important: `{{ topic }}` was initially used, but an InputSignal is read with `topic()`.

### Parent TypeScript

```ts
import { TopicCard } from '../topic-card/topic-card.component';

@Component({
  selector: 'app-angular-topics',
  imports: [TopicCard],
  templateUrl: './angular-topics.component.html',
  styleUrl: './angular-topics.component.css',
})
export class AngularTopicsComponent {
  // Existing title, imageUrl, and topics[] remain here.
}
```

The parent imports TopicCard so its template can use the selector.

### Parent HTML

```html
@for (topic of topics; track topic; let i = $index) {
  <div class="topic-row">
    <span class="topic-number">{{ i + 1 }}</span>

    <app-topic-card [topic]="topic"></app-topic-card>
  </div>
} @empty {
  <p>No Angular topics available.</p>
}
```

The left `[topic]` is the child's input name. The right `topic` is the current loop item in the parent.

```text
Parent topics[]
    ↓ @for selects one string
Parent [topic]="topic"
    ↓
Child topic = input.required<string>()
    ↓
Child {{ topic() }}
```

### CSS responsibility

The button CSS moved to `topic-card.component.css`. The parent retained list layout, numbering, and spacing.

```css
/* Child: make the host fill the parent row. */
:host {
  display: block;
  width: 100%;
}
```

```css
/* Parent: arrange the number and reusable card. */
.topic-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

app-topic-card {
  display: block;
  flex: 1;
  min-width: 0;
}
```

`flex: 1` lets the card use available space. `min-width: 0` allows it to shrink rather than force overflow. The original button and number-badge CSS is preserved in the archive.

**Original practical coverage:** required string input, parent binding, signal-input reading, reusable child, and CSS ownership. Defaults, aliases, transforms, and additional types are in the revised concept README, not the original Day 7 implementation.

**Checkpoint:** Trace one topic from the array to the child button. Explain why the parent imports TopicCard and why the child uses `topic()`.

---

## 3. Day 8 — Child → Parent with output()

### What we built

Clicking a topic needed to open its notes. The selected topic traveled from TopicCard through AngularTopicsComponent to App. App passed it to TopicNotes.

The original requirements also said the list should disappear while notes were displayed, and clicking Angular again should return to the list.

### Step 1 — TopicCard sends the clicked topic

```ts
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-topic-card',
  imports: [],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css',
})
export class TopicCard {
  topic = input.required<string>();
  selectedTopic = output<string>();

  onSelectedTopic() {
    this.selectedTopic.emit(this.topic());
  }
}
```

```html
<button class="topic-card" (click)="onSelectedTopic()">
  <span>{{ topic() }}</span>
</button>
```

The input supplies the topic name. The output reports which topic was clicked.

### Step 2 — AngularTopics receives and forwards

The parent imports TopicCard and declares its own output:

```ts
selectedTopic = output<string>();

onTopicSelected(topic: string) {
  this.selectedTopic.emit(topic);
}
```

```html
<app-topic-card
  [topic]="topic"
  (selectedTopic)="onTopicSelected($event)">
</app-topic-card>
```

Here `$event` is the string emitted by TopicCard.

```text
TopicCard emits "Components"
    ↓
AngularTopics HTML receives $event
    ↓
onTopicSelected("Components")
    ↓
AngularTopics emits "Components"
```

### Step 3 — App stores the selected notes

The historical root owned:

```ts
selectedTopicNotes = "";
```

The Angular button reset it:

```ts
angularTopics() {
  this.selectedTopic = "AngularBasics";
  this.selectedTopicNotes = "";
}
```

The original implementation initially rendered AngularTopicsComponent twice. The recorded fix was to keep one Angular section and switch between list and notes inside it.

```html
@if (selectedTopic === "AngularBasics") {
  @if (selectedTopicNotes === "") {
    <app-angular-topics
      (selectedTopic)="selectedTopicNotes = $event">
    </app-angular-topics>
  } @else {
    <app-topic-notes
      [topicNotes]="selectedTopicNotes">
    </app-topic-notes>
  }
} @else if (selectedTopic === "C#Basics") {
  <p>Learn C#</p>
} @else if (selectedTopic === "TypeScriptBasics") {
  <p>Learn TypeScript</p>
} @else {
  <p>Please select a topic</p>
}
```

App must import AngularTopicsComponent and TopicNotes. The original Day 8 guide showed important additions rather than a complete final root decorator.

### Step 4 — TopicNotes receives the selection

```ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-topic-notes',
  imports: [],
  templateUrl: './topic-notes.component.html',
  styleUrl: './topic-notes.component.css',
})
export class TopicNotes {
  topicNotes = input.required<string>();
}
```

```html
<p>topic-notes works!</p>
<h1>{{ topicNotes() }}</h1>
```

This was a placeholder proving that the selected topic reached the notes component. It did not yet load Markdown content.

### Complete historical flow

```text
App displays AngularTopics
    ↓
AngularTopics owns topics[]
    ↓ input()
TopicCard receives "Components"
    ↓ user clicks
TopicCard emits "Components"
    ↑ output()
AngularTopics receives $event
    ↓ forwards with its own output
App receives $event
    ↓
selectedTopicNotes = "Components"
    ↓ @if / @else
TopicNotes receives [topicNotes]
    ↓
topicNotes() displays "Components"
```

Clicking Angular again reset `selectedTopicNotes` to an empty string, so the list returned.

### Why this design mattered

App owned the selected view. AngularTopics owned the list and forwarded selection. TopicCard owned the reusable button and reported clicks. TopicNotes received the selected topic and displayed the placeholder notes area.

The separate historical architecture review later used renamed properties such as `selectedTechnology`, `selectedLearningTopicNotes`, `learningTopic`, and `selectedLearningTopic`. These are naming variations, not new communication concepts.

**Original practical coverage:** string output payloads, `emit()`, `$event`, explicit forwarding, input down/events up, and conditional list/notes rendering. Typed object payloads, output aliases, and `output<void>()` are covered in the revised concept README but were not implemented in the original snapshot.

**Checkpoint:** Trace a click from TopicCard to App and then to TopicNotes. Explain what `$event` contains, why AngularTopics emits again, and why the root needed only one Angular section.

---

## 4. Historical architecture versus current routing

The historical architecture used App state to select the technology and notes view. The application later adopted Angular Router.

```text
Historical:
App → manual @if selection → AngularTopics → TopicCard
App → selectedTopicNotes → TopicNotes

Later routed design:
App / RouterOutlet
    ↓ URL /angular
AngularTopics → TopicCard
    ↓ navigation to /angular/topic/:topic
TopicNotes → ActivatedRoute reads the parameter
```

The later reviewed code also introduced a topic service, JSON models, slugs, search, and expandable card details. Those features are not part of the Day 6–8 snapshots.

**Do not paste the historical App or TopicNotes code into the current application.** Verify the latest checked-out source before editing or removing obsolete state.

## 5. Small revision exercises

These are reconstruction tasks, not a new feature assignment.

### A. Control flow

Use a temporary array of three objects with stable IDs. Write a numbered `@for` with `@empty`. Explain what happens when the list is empty or reordered. Identify where `$first`, `$last`, `$even`, and `$odd` could be used.

### B. Input connection

Trace the current AngularTopics → TopicCard binding. Identify the parent expression, child input declaration, and child template read. Explain which component owns the data.

### C. Output connection

Trace the current topic click. Identify the native click, child method, emitted payload, parent listener, and any forwarding or navigation. Do not assume the historical root listener still exists.

### D. Debugging

Explain why `{{ topic }}` was wrong for an InputSignal, why a mismatched output name prevents the intended listener from running, and why rendering the same list in two places caused duplicate UI.

## 6. Current-code comments

Add comments only where they explain ownership or flow. Verify actual names before editing.

```ts
// Parent owns the topic collection; each card receives one topic.
```

```ts
// Notify the parent which topic was selected.
```

```ts
// Read the route parameter to identify the requested notes page.
```

Do not add comments that merely repeat syntax. Do not restore obsolete manual view-switching state.

## 7. Preservation and cleanup

The companion ZIP contains the original four files unchanged: Day 6 practical, Day 7 practical, Day 8 practical, and the historical architecture review. It preserves full source snapshots, CSS, the complete original topic array, and the original exercise/result descriptions.

- [x] Preserve the original practical files in the companion archive.
- [x] Preserve the historical architecture review.
- [x] Consolidate the implementation journey and important corrections.
- [ ] Compare this reference with the latest checked-out application.
- [ ] Add or verify meaningful comments in current source.
- [ ] Complete the small code-tracing/debugging checkpoints.
- [ ] Run the application and verify the current routed topic flow.
- [ ] Commit the preserved notes before deleting old folders.

The checked items refer only to documentation preservation, not mastery or application testing. Roadmap completion remains separate.
