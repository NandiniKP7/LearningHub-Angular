# Day 12 — Signal-Based State Changes

## What Problem Does This Solve?

A signal can hold state that changes while the user interacts with the app.

Example:

```typescript
selectedTechnology = signal('');
```

When the user clicks Angular:

```typescript
this.selectedTechnology.set('AngularBasics');
```

```text
User action
    ↓
Signal changes
    ↓
UI reacts
```

---

## Where Do We Use This?

Usually in component TypeScript:

```text
Event
→ component method
→ signal.set() / signal.update()
→ template reads signal()
```

Example:

```html
<button (click)="selectAngular()">
  Angular
</button>
```

```typescript
selectAngular() {
  this.selectedTechnology.set('AngularBasics');
}
```

---

## `.set()` — Replace the Current Value

Use `.set()` when you know the exact new value.

```typescript
selectedTechnology = signal('');

selectAngular() {
  this.selectedTechnology.set('AngularBasics');
}
```

```text
"" → "AngularBasics"
```

---

## `.update()` — Use the Current Value

Use `.update()` when the new value depends on the current value.

```typescript
count = signal(0);

increaseCount() {
  this.count.update(current => current + 1);
}
```

```text
0 → 1 → 2
```

---

## Toggle State

A boolean signal can switch between `true` and `false`.

```typescript
showDetails = signal(false);

toggleDetails() {
  this.showDetails.update(current => !current);
}
```

Useful for:

```text
show / hide
open / close
enabled / disabled
```

---

## Selected State

A signal can store which item is selected.

```typescript
selectedLearningTopic = signal('');

selectTopic(topic: string) {
  this.selectedLearningTopic.set(topic);
}
```

```text
User selects "Components"
        ↓
selectedLearningTopic()
→ "Components"
```

---

## Array State

Signals can hold arrays.

```typescript
completedTopics = signal<string[]>([]);
```

Add an item:

```typescript
markComplete(topic: string) {
  this.completedTopics.update(current => [
    ...current,
    topic
  ]);
}
```

---

## Object State

Signals can hold objects.

```typescript
profile = signal({
  name: 'Developer',
  level: 1
});
```

Update one property:

```typescript
increaseLevel() {
  this.profile.update(current => ({
    ...current,
    level: current.level + 1
  }));
}
```

---

## Minimal State

Keep only the state you actually need.

```text
signal()
→ source state

computed()
→ derived state
```

Do not create extra writable signals for values that can already be calculated.

---

## Signal State + UI

```typescript
showDetails = signal(false);
```

```html
<button (click)="toggleDetails()">
  Toggle Details
</button>

@if (showDetails()) {
  <p>Details are visible</p>
}
```

Flow:

```text
Button click
    ↓
toggleDetails()
    ↓
showDetails.update(...)
    ↓
@if reads showDetails()
    ↓
UI changes
```

---

## Learning Hub Connection

Your Learning Hub already has signal-based state:

```typescript
selectedTechnology = signal('');
```

and:

```typescript
searchText = signal('');
```

Today we will focus on using signals to manage state changes cleanly:

```text
event
→ state change
→ UI reaction
```

We will only add a feature if it naturally improves the Learning Hub.

---

## Quick Memory Rule

```text
.set(newValue)
→ replace current value

.update(current => ...)
→ calculate new value from current value

signal()
→ source state

computed()
→ derived state
```

---

## Main Idea

```text
User does something
        ↓
Signal state changes
        ↓
Angular reads new state
        ↓
UI updates
```
