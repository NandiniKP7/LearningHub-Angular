# Day 19 — Sharing Data / State with Services
## Practical Implementation — Developer Learning Hub

## 1. What We Implemented

Today we moved the selected Angular topic into `TopicService`.

```text
TopicCard
→ AngularTopicsComponent
→ TopicService
→ TopicNotes
```

`TopicService` is now the shared owner of the selected-topic state. `App` uses service state to decide whether to show the topic list or topic notes.

## 2. Problem We Solved

Previously `App` stored another selected-topic value:

```ts
selectedLearningTopicNotes = '';
```

`AngularTopicsComponent` emitted the value to `App`, and `App` passed it to `TopicNotes`.

The new design stores the selected topic once in `TopicService`, avoiding duplicate source state.

## 3. Final Data Flow

```text
User clicks TopicCard
→ TopicCard emits selected topic
→ AngularTopicsComponent.onTopicSelected(topic)
→ TopicService.learningTopicUpdated(topic)
→ private learningTopic signal changes
→ selectedLearningTopic exposes the value readonly
→ TopicNotes reads selectedLearningTopic()
```

## 4. TopicService — Shared State

```ts
import { computed, Injectable, signal } from '@angular/core';
import angularTopicsData from '../angular-learning-topics.json';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  getTopics() {
    return angularTopicsData.topics;
  }

  // Only the service can directly write this signal.
  private learningTopic = signal('');

  // Components can read it, but cannot call .set()/.update() on it.
  selectedLearningTopic = this.learningTopic.asReadonly();

  // Components request an update through this method.
  learningTopicUpdated(topic: string) {
    this.learningTopic.set(topic);
  }

  // Used when returning to the Angular topic list.
  clearSelectedLearningTopic() {
    this.learningTopic.set('');
  }

  // Derived state: true when a topic is selected.
  hasSelectedTopic = computed(
    () => this.selectedLearningTopic() !== ''
  );
}
```

### Pattern

```text
private writable signal
→ public readonly signal
→ service methods control changes
```

`readonly` does not mean the value can never change. The service can change the private writable signal; consumers cannot directly mutate the public readonly signal.

## 5. Understanding `hasSelectedTopic`

```ts
hasSelectedTopic = computed(
  () => this.selectedLearningTopic() !== ''
);
```

The comparison itself returns a boolean:

```text
'Signals' !== '' → true
'' !== ''        → false
```

So an additional `if/else` is unnecessary.

## 6. AngularTopicsComponent — Updating the Service

```ts
onTopicSelected(topic: string) {
  this.selectedLearningTopic.emit(topic);
  this.topicService.learningTopicUpdated(topic);
  console.log(topic);
}
```

The important new call is:

```ts
this.topicService.learningTopicUpdated(topic);
```

`learningTopicUpdated()` is a normal service method, so it does not use `.emit()`.

## 7. TopicNotes — Reading the Shared Signal

```ts
import { Component, inject } from '@angular/core';
import { TopicService } from '../services/topicService.service';

export class TopicNotes {
  topicService = inject(TopicService);
}
```

Template:

```html
<p>topic-notes works!</p>
<h1>{{ topicService.selectedLearningTopic() }}</h1>
```

Angular templates do not require `this.`.

## 8. App — Removing Duplicate State

Previously `App` owned:

```ts
selectedLearningTopicNotes = '';
```

That selected-topic copy is no longer required.

`App` injects the service:

```ts
topicService = inject(TopicService);
```

The display decision can now use:

```html
@if (!topicService.hasSelectedTopic()) {
  <app-angular-topics></app-angular-topics>
}
@else {
  <app-topic-notes></app-topic-notes>
}
```

The old parent bindings are no longer required:

```html
(selectedLearningTopic)="selectedLearningTopicNotes = $event"
[topicNotes]="selectedLearningTopicNotes"
```

## 9. Returning to the Topic List

```ts
angularTopics() {
  this.selectedTechnology.set('AngularBasics');
  this.topicService.clearSelectedLearningTopic();
}
```

Flow:

```text
learningTopic becomes ''
→ hasSelectedTopic() becomes false
→ App shows AngularTopicsComponent
```

## 10. Before vs After

Before:

```text
AngularTopicsComponent
→ output
→ App.selectedLearningTopicNotes
→ input
→ TopicNotes
```

After:

```text
AngularTopicsComponent
→ TopicService
→ TopicNotes
```

The selected topic now has one shared owner.

## 11. `output()` vs Service Method

Angular output:

```ts
selectedLearningTopic.emit(topic);
```

means a component emits an event to a listener.

Service method:

```ts
this.topicService.learningTopicUpdated(topic);
```

means the component calls a normal method and the service changes its state.

Therefore this is incorrect:

```ts
this.topicService.learningTopicUpdated.emit(topic);
```

because `learningTopicUpdated` is a method, not an Angular output.

## 12. What Today's Practical Reinforced

- shared state ownership
- signals in services
- private writable/public readonly pattern
- `.asReadonly()`
- service-controlled updates
- computed service state
- local vs shared state
- avoiding duplicate source state
- `inject()`
- reading signals with `()`
- updating writable signals with `.set()`
- `output().emit()` versus calling a service method

## 13. Memory Rule

```text
Several components need the same state
→ consider one shared owner

Service owns source state
→ private writable signal

Consumers need to read it
→ public readonly signal

State must change
→ call a service method

Value can be calculated from source state
→ computed()

Do not store the same source state twice
→ single source of truth
```

## Final Result

```text
CLICK TOPIC
→ AngularTopicsComponent
→ TopicService.learningTopicUpdated(topic)
→ private learningTopic.set(topic)
→ selectedLearningTopic()
→ TopicNotes displays selected topic
```

This is the Developer Learning Hub practical application of **Sharing Data / State with Services**.
