# 13 — Signal-Based State Changes
**Revision date:** September 9, 2026
**Planned learning time:** 1–2 days


## Overview — connecting user actions to state

A signal stores what the application remembers. An event is something that happens, such as a button click. A component method connects the event to the state change.

For example, a panel remembers whether it is open:

```ts
isOpen = signal(false);

toggle() {
  this.isOpen.update(current => !current);
}
```

```html
<button (click)="toggle()">Toggle</button>

@if (isOpen()) {
  <p>Panel content</p>
}
```

The click calls the method, the method changes the boolean, and the template displays the new state. This is not a new kind of signal; it is practice combining event binding, writable signals, and computed values.

We will extend this pattern to counters, arrays, objects, selected items, and minimal state so that one action changes the correct source value without creating unnecessary duplicate state.


## 1. Event → signal update
```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.html'
})
export class Details {
  showDetails = signal(false);

  toggleDetails() {
    this.showDetails.update(current => !current);
  }
}
```
```html
<button (click)="toggleDetails()">Toggle details</button>

@if (showDetails()) {
  <p>Details are visible.</p>
}
```
The click invokes the method. The method changes the signal. @if reads the new boolean.

## 2. set vs update
```ts
count = signal(0);

reset() {
  this.count.set(0);
}

increment() {
  this.count.update(current => current + 1);
}
```
Use set for a known replacement and update when the next value depends on the current value.

## 3. Toggle and counter
```ts
isOpen = signal(false);

open() {
  this.isOpen.set(true);
}

close() {
  this.isOpen.set(false);
}

toggle() {
  this.isOpen.update(open => !open);
}
```
Use explicit set when the desired state is known. Use toggle to reverse the current state.

## 4. Array add/remove/update
```ts
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

tasks = signal<Task[]>([]);
```
Add:
```ts
addTask(task: Task) {
  this.tasks.update(current => [...current, task]);
}
```
Remove by stable ID:
```ts
removeTask(id: number) {
  this.tasks.update(current =>
    current.filter(task => task.id !== id)
  );
}
```
Update one item:
```ts
toggleTask(id: number) {
  this.tasks.update(current =>
    current.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )
  );
}
```
map returns a new array. The matching task is copied into a new object with its completed value reversed. Other objects are reused unchanged. Stable IDs avoid accidentally changing every item with the same title.

Avoid push, splice, or direct property mutation on the stored array when updating reactive state.

## 5. Object updates
```ts
profile = signal({
  name: 'Developer',
  level: 1
});

rename(name: string) {
  this.profile.update(current => ({
    ...current,
    name
  }));
}
```
The new object preserves level and replaces name. The shorthand name means name: name.

For nested objects:
```ts
settings = signal({
  notifications: { email: true, push: false }
});

toggleEmail() {
  this.settings.update(current => ({
    ...current,
    notifications: {
      ...current.notifications,
      email: !current.notifications.email
    }
  }));
}
```

## 6. Selected state
```ts
selectedTaskId = signal<number | null>(null);

selectTask(id: number) {
  this.selectedTaskId.set(id);
}

clearSelection() {
  this.selectedTaskId.set(null);
}
```
number | null means a numeric ID or no selection. Store a stable ID rather than duplicating the entire selected object.

```ts
selectedTask = computed(() =>
  this.tasks().find(task => task.id === this.selectedTaskId()) ?? null
);
```
find returns a matching task or undefined. ?? null converts a missing result to null.

## 7. Minimal state
Store only independent values that must be remembered. Store tasks and selectedTaskId; do not also maintain writable selectedTask, completedCount, and remainingCount when those can be calculated. This reduces synchronization bugs.

## 8. Derived state
```ts
completedCount = computed(() =>
  this.tasks().filter(task => task.completed).length
);

remainingCount = computed(() =>
  this.tasks().length - this.completedCount()
);

hasSelection = computed(() => this.selectedTaskId() !== null);
```
Computed values are read-only. Change source state and let Angular calculate results.

## 9. Component-local vs shared state
A card's expanded state can belong to that card. Each instance then has its own signal. State needed by multiple unrelated components may belong in a shared service, covered later. Do not move all state into a service merely because signals exist.

## 10. Common mistakes
Direct mutation; duplicate writable derived state; display text as identity; child mutation of parent input; effects used to copy derived values; adding state before deciding ownership.

## Quick reference
```ts
flag.update(value => !value);
count.update(value => value + 1);
items.update(items => [...items, newItem]);
items.update(items => items.filter(item => item.id !== id));
object.update(value => ({ ...value, name: 'New' }));
```

## Retrieval checkpoint
Trace a click to the template; implement toggle/reset; add/remove/update array items immutably; update an object; choose minimal source state; derive a selected item and count.

**Coverage:** event→signal, set vs update, toggle/counter, array add/remove, object updates, selected state, minimal state, derived state.

