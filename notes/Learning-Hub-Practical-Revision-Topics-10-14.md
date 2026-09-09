# Practical Revision — Topics 10–14

**Date:** September 9, 2026

## Purpose and scope

This guide consolidates the five historical practical implementations into one reference for the current revision. It preserves what was actually built and adds clearly marked reinforcement exercises for checklist items that were not implemented historically.

**Do not paste the historical root component into the current routed application.** The old technology-selection state was replaced by routing. Use the old snapshots to understand the original learning progression and trace the equivalent behavior in the current repository.

### How to use this guide
Read one topic's concept README, reconstruct the relevant code from memory, compare with the historical snapshot, and trace the current implementation. Work within 35–45 minutes and carry unfinished work forward. No new product feature is required this week.

### Historical sequence
| Current topic | Historical day | Actual app change |
|---|---|---|
| 10 Writable Signals | Day 9 | Technology selection changed to a writable signal |
| 11 Computed Signals | Day 10 | Search text and computed topic filtering |
| 12 Signal Inputs | Day 11 | Topic text and index passed to reusable cards |
| 13 State Changes | Day 12 | JSON topic objects and expandable subtopics |
| 14 effect() | Day 13 | Search persisted in localStorage |

The original files remain separate and unchanged. The historical snapshots below are reference code, not a claim that the current repository still has the same architecture.

---

## Topic 10 — Writable Signals

### Historical goal
Replace the root's normal selectedTechnology property with a writable signal. The original UI used manual `@if` branches to display Angular, TypeScript, or C#.

### Files involved
- `app.component.ts`
- `app.component.html`

### Before and after
```ts
// Before
selectedTechnology = '';

// After
selectedTechnology = signal('');
```

The signal stores the selected technology. The click methods use set because the exact next value is known.

### Historical complete TypeScript snapshot
```ts
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

  // Day 9: root-owned technology selection.
  selectedTechnology = signal('');

  // Historical manual notes selection; not yet a signal.
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

### Historical template block
The original practical file supplied this selection block, not a complete standalone HTML document.
```html
@if (selectedTechnology() === "AngularBasics") {
  @if (selectedLearningTopicNotes === "") {
    <app-angular-topics
      (selectedLearningTopic)="selectedLearningTopicNotes = $event">
    </app-angular-topics>
  } @else {
    <app-topic-notes
      [topicNotes]="selectedLearningTopicNotes">
    </app-topic-notes>
  }
} @else if (selectedTechnology() === "C#Basics") {
  <p>Learn C#</p>
} @else if (selectedTechnology() === "TypeScriptBasics") {
  <p>Learn TypeScript</p>
} @else {
  <p>Please select a technology</p>
}
```

### What to understand
The component owns selectedTechnology. The button calls a method, the method calls set, and the template reads the signal with `()`. The notes-selection property was separate state and remained a normal property.

The historical static topic array was deliberately left as a normal array. The guide introduced future examples of a signal-backed API list and a counter using update, but did not implement those features.

### Revision task
1. Locate the current technology navigation and explain how routing replaced the old selection branches.
2. Reconstruct a small counter using signal, set, update, and template reading.
3. Explain why a static title can remain a normal property.
4. Complete the Topic 10 array/object reinforcement in the appendix without modifying the current app.

**Checkpoint:** Explain the old click flow and the current routed flow without confusing them.

---

## Topic 11 — Computed Signals

### Historical goal
Add a search box to AngularTopicsComponent. Search text is source state; the filtered list is calculated state.

### Files involved
- `angular-topics.component.ts`
- `angular-topics.component.html`

### Historical implementation blocks
```ts
import { Component, computed, signal } from '@angular/core';

// Inside AngularTopicsComponent:
searchText = signal('');

filteredAngularTopics = computed(() =>
  this.angularLearningTopics.filter((topic) => {
    return topic
      .toLowerCase()
      .includes(this.searchText().toLowerCase());
  })
);

onSearch(event: Event) {
  this.searchText.set(
    (event.target as HTMLInputElement).value
  );
}
```

The original list was an array of strings. `filter()` creates a new array; `toLowerCase()` makes the comparison case-insensitive; `includes()` checks whether a title contains the query. The computed value is read-only.

### Historical search template
```html
<input
  type="text"
  placeholder="Search Angular Topics"
  [value]="searchText()"
  (input)="onSearch($event)"
>

@for (
  angularLearningTopic of filteredAngularTopics();
  track angularLearningTopic;
  let i = $index
) {
  <app-topic-card
    [learningTopic]="angularLearningTopic"
    (selectedLearningTopic)="onTopicSelected($event)">
  </app-topic-card>
}
```

The input's value binding displays the current signal value. The input event sends the native event to the method. The method reads the textbox value and stores it in searchText.

### Historical progression to object data
On the next day, topics became objects. The search changed from:
```ts
topic.toLowerCase()
```
to:
```ts
topic.title.toLowerCase()
```
The computed pattern stayed the same. The original list was not destroyed by filtering.

### Current-code trace
Find the current searchText, filteredAngularTopics, and template. Identify which values are writable, which are computed, and which ordinary data source supplies the topics. Explain why the computed list does not need set.

### Revision task
Reconstruct the search method and computed filter without looking. Test an empty query, mixed-case query, one match, and no matches. Explain how the template gets the updated list.

**Checkpoint:** Explain source state, derived state, and why changing a non-signal array by ordinary assignment does not itself establish a reactive dependency.

---

## Topic 12 — Signal Inputs

### Historical goal
Pass both topic text and its display number from AngularTopicsComponent to TopicCard. The child receives and displays the values without owning them.

### Files involved
- `topic-card.component.ts`
- `topic-card.component.html`
- `topic-card.component.css`
- `angular-topics.component.html`

### Historical complete child TypeScript
```ts
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-topic-card',
  imports: [],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css',
})
export class TopicCard {
  // Existing parent-provided title.
  learningTopic = input.required<string>();

  // Day 11: parent-provided display number.
  learningTopicIndex = input.required<number>();

  selectedLearningTopic = output<string>();

  onSelectedLearningTopic() {
    this.selectedLearningTopic.emit(this.learningTopic());
  }
}
```

### Historical complete child HTML
```html
<button
  class="topic-card"
  (click)="onSelectedLearningTopic()">

  <span class="topic-number">
    {{ learningTopicIndex() }}
  </span>

  <span class="topic-title">
    {{ learningTopic() }}
  </span>

</button>
```

### Historical parent binding
The original parent template retained its header, logo, search input, and topic-list container. The new card binding was:
```html
@for (
  angularLearningTopic of filteredAngularTopics();
  track angularLearningTopic;
  let i = $index
) {
  <div class="topic-row">
    <app-topic-card
      [learningTopicIndex]="i + 1"
      [learningTopic]="angularLearningTopic"
      (selectedLearningTopic)="onTopicSelected($event)">
    </app-topic-card>
  </div>
} @empty {
  <p>No Angular topics available.</p>
}
```

`$index` starts at zero. `i + 1` produces the human-readable number. The expression inside `[learningTopicIndex]` evaluates to a number, not a string.

### HTML and CSS introduced here
`span` separates the number and title so they can be styled independently. `display: flex` places them beside each other; `align-items: center` aligns them vertically; `gap` adds spacing; `flex-shrink: 0` prevents the number circle from shrinking.

The historical CSS is preserved in the companion archive. Its key selectors were `.topic-card`, `.topic-number`, `.topic-title`, and `.topic-card:hover`.

### Current-code trace
Locate the current TopicCard inputs and parent bindings. The current card may also receive a slug and subtopic array and navigate using Router. Explain which values come from the parent and which state belongs locally to the card.

### Revision task
Reconstruct the two required inputs and parent bindings. Then explain what would happen if the parent omitted a required input, and why the child cannot call set on an input.

**Checkpoint:** Parent owns value → property binding → child input → child reads `()`.

---

## Topic 13 — Signal-Based State Changes

### Historical goal
Move topic data into JSON and let each TopicCard expand or collapse its own subtopic list.

### Files involved
- `data/angular-learning-topics.json`
- `angular-topics.component.ts`
- `angular-topics.component.html`
- `topic-card.component.ts`
- `topic-card.component.html`
- `topic-card.component.css`

### 1. Historical data change
The string list became topic objects:
```json
{
  "id": 3,
  "title": "Components",
  "subTopics": [
    "@Component",
    "selector",
    "imports",
    "standalone components"
  ]
}
```
The original import and assignment were:
```ts
import angularTopicsData from '../data/angular-learning-topics.json';

angularLearningTopics = angularTopicsData.topics;
```
The old hard-coded string array was no longer needed.

### 2. Search adapted to objects
```ts
searchText = signal('');

filteredAngularTopics = computed(() =>
  this.angularLearningTopics.filter((topic) => {
    return topic.title
      .toLowerCase()
      .includes(this.searchText().toLowerCase());
  })
);
```
The source changed shape, but searchText remained writable and filteredAngularTopics remained computed.

### 3. Parent passes the data
```html
<app-topic-card
  [learningTopicIndex]="i + 1"
  [learningTopic]="angularLearningTopic.title"
  [subTopics]="angularLearningTopic.subTopics"
  (selectedLearningTopic)="onTopicSelected($event)">
</app-topic-card>
```

### 4. Child inputs and local state
```ts
learningTopic = input.required<string>();
learningTopicIndex = input.required<number>();
subTopics = input.required<string[]>();

isExpandable = signal(false);

toggleDetails() {
  this.isExpandable.update(current => !current);
}
```
The parent owns topic data. Each card owns its own expanded/collapsed boolean. Update is appropriate because the next boolean depends on the current one.

### 5. Historical complete child HTML
```html
<div class="topic-card-row">
  <button
    class="topic-card"
    (click)="onSelectedLearningTopic()">

    <span class="topic-number">
      {{ learningTopicIndex() }}
    </span>

    <span class="topic-title">
      {{ learningTopic() }}
    </span>
  </button>

  <button
    class="details-toggle"
    (click)="toggleDetails()">

    @if (isExpandable()) {
      ▼
    } @else {
      ▶
    }
  </button>
</div>

@if (isExpandable()) {
  <div class="topic-details">
    @for (item of subTopics(); track item; let j = $index) {
      <p>
        {{ learningTopicIndex() }}.{{ j + 1 }} {{ item }}
      </p>
    }
  </div>
}
```

The main button opens the topic notes. The arrow button changes only the local expansion state. `j + 1` produces subtopic numbering such as 1.1 and 1.2.

### 6. Historical CSS
The original stylesheet contains the complete rules for `.topic-card-row`, `.topic-card`, `.topic-number`, `.topic-title`, `.details-toggle`, `.topic-details`, and `.topic-details p`. Preserve that snapshot rather than replacing the current app's styles.

The important layout ideas are a flex row for the two buttons, a flexible main button, a fixed-size arrow button, and an indented details panel.

### 7. Independent component instances
Each card creates its own `isExpandable` signal. Therefore, two cards can be expanded at the same time. Expanding one does not automatically collapse another.

### Current-code trace
Locate the JSON/model/service data path, parent bindings, and TopicCard toggle. Explain why the current model may contain more fields than the historical JSON and why the old import path should not be copied blindly.

### Revision task
Reconstruct the toggle and conditional subtopic rendering. Expand two cards and explain why both remain open. Complete the immutable array/object reinforcement in the appendix separately.

**Checkpoint:** Distinguish parent-owned topic data, child-owned expansion state, and computed search results.

---

## Topic 14 — effect()

### Historical goal
Remember the Angular search text after a browser refresh using localStorage.

### Files involved
- `angular-topics.component.ts`
- Existing search template, unchanged

### Historical import
```ts
import {
  Component,
  computed,
  effect,
  output,
  signal
} from '@angular/core';
```

### 1. Initialize from saved storage
```ts
searchText = signal(
  localStorage.getItem('angularSearchText') ?? ''
);
```
`getItem()` returns the saved string or null. `?? ''` supplies an empty string when nothing was saved. Reading storage first prevents the initial effect from immediately overwriting an existing search with an empty value.

### 2. Existing search event
```ts
onSearch(event: Event) {
  this.searchText.set(
    (event.target as HTMLInputElement).value
  );
}
```

### 3. Existing computed filter
```ts
filteredAngularTopics = computed(() =>
  this.angularLearningTopics.filter((topic) => {
    return topic.title
      .toLowerCase()
      .includes(this.searchText().toLowerCase());
  }),
);
```
This calculates a value; it does not save anything.

### 4. Historical effect
```ts
saveSearchText = effect(() => {
  localStorage.setItem(
    'angularSearchText',
    this.searchText()
  );
});
```
The effect reads searchText, so Angular tracks it. The first argument to setItem is the fixed storage key; the second is the current user-entered value.

### Test the original behavior
Type `comp`, confirm the list filters, refresh, and confirm the search text and filtered results return. Clear the search and refresh again. Explain why the initial value must be read before persistence begins.

### Computed versus effect
The same source signal feeds two different consumers: computed calculates the filtered list; effect synchronizes the search text to browser storage. Do not replace computed with an effect that manually copies a filtered array into another writable signal.

### Current-code trace
Locate the current search initialization and persistence effect. Explain the browser-only nature of localStorage. If the app later supports server rendering, browser access needs an appropriate guard; do not add unrelated infrastructure during this revision.

### Reinforcement
The historical practical file did not implement cleanup. Use the isolated cleanup exercise in the appendix to understand how an effect cancels previous external work.

**Checkpoint:** Explain startup restoration, the storage key/value, dependency tracking, and why computed and effect have different jobs.

---

## Reinforcement appendix — checklist gaps

These are **new revision exercises**, not claims about the historical Learning Hub implementation. Complete them in a scratch component or TypeScript practice file, not by adding unrelated features to the current app.

### A. Writable arrays and objects
Create a typed array signal containing three tasks with id, title, and completed. Implement add, remove by ID, and toggle completed using immutable updates. Create an object signal for a profile and update one property without losing the others.

Requirements: use signal, set or update appropriately, spread, filter, and map. Do not mutate the stored array/object directly. Explain why a new reference is returned.

### B. Computed dependencies
Create price and quantity writable signals, then derive total and a boolean indicating whether total exceeds a threshold. Add a conditional computed value that reads an optional source only when a boolean is true. Explain dynamic dependencies and why computed is read-only.

### C. Input variations
In a scratch parent/child pair, practice a required string input, a default number input, an optional input, and a computed value derived from two inputs. Explain which component owns each value. Do not modify parent-owned objects inside the child.

### D. Minimal and selected state
Store a task array and selectedTaskId. Derive the selected task and completed count using computed. Do not store duplicate writable copies of those derived values. Implement a clear-selection action.

### E. Effect cleanup
Create a scratch component with a query signal and an effect that starts a short timer. Register onCleanup to cancel the previous timer. Change the query twice before the timer finishes and explain which work should be cancelled.

This exercise demonstrates cleanup only; it is not a replacement for the historical localStorage implementation.

## Current repository verification

Before editing, inspect the actual current files and their imports. The historical snapshots may differ from the routed app, especially root navigation, topic models, service ownership, and TopicCard navigation. Do not overwrite current files with old snapshots.

Use these checks:
- [ ] Explain where current technology navigation is owned.
- [ ] Trace searchText → computed filter → topic cards.
- [ ] Trace parent topic data → TopicCard inputs.
- [ ] Trace the card's local expand/collapse state.
- [ ] Trace searchText → effect → localStorage.
- [ ] Complete the isolated reinforcement exercises relevant to the checklist.
- [ ] Add only meaningful comments to current code where they clarify ownership or a non-obvious decision.
- [ ] Run the app and verify existing behavior before committing.

## Completion rule

A concept is complete when you can explain its purpose, reconstruct its essential syntax, trace its existing implementation, and solve the relevant small reinforcement task. The historical practical files are preserved; the current app should not be changed merely to recreate obsolete architecture.
