# 10 — Writable Signals
**Revision date:** September 9, 2026
**Planned learning time:** 2–3 days

## Start here — the big picture

You have already learned several related Angular tools. They are connected, but they do different jobs. You do not need to memorize their technical classifications before using them.

| Tool | Simple meaning | Can we change it directly? |
|---|---|---|
| `signal()` | Store state that we own | Yes, with `set()` and `update()` |
| `computed()` | Calculate a value from other signals | No; change its sources |
| `input()` | Receive parent-owned data as a signal | No; the parent supplies it |
| `effect()` | Perform an action when tracked signals change | It is a reactive function, not stored state |
| `output()` | Notify a parent that something happened | It is an event channel, not a signal |

The first three create signal values. `effect()` and `output()` are related tools with different purposes. Calling them all “signal tools” is fine while learning; the distinction matters when deciding which one to use.

### What does Angular actually detect?

A signal is a container whose value Angular can track. When you call `set()` or `update()` with a changed value, Angular can notify consumers that read that signal. A template that reads it can then display the new value. You do not manually refresh the browser.

This does **not** mean every TypeScript assignment is a signal update. Normal properties still work in Angular, and Angular has other ways to detect changes. Signals also do not automatically remove Zone.js from every application. Angular supports zoneless change detection; signals provide a way to notify Angular about reactive state changes.

The learning sequence is: understand the stored value → learn how it changes → learn how values are derived → learn how components receive values → combine state with events → learn external side effects.

---

## Before the syntax: one value, one owner

Imagine a counter showing 0. The component owns the number. When the user clicks Increase, the component changes it and the template displays the result. A writable signal is a suitable container for that changing number.

A signal does not automatically change every TypeScript variable. You must update the signal through its API. A normal property can still be used when reactive tracking is unnecessary.

### What does `WritableSignal<number>` mean?

`WritableSignal` is the TypeScript type of a signal that can be changed. `<number>` says the stored value must be a number. You normally write `count = signal(0)` and let TypeScript infer the type. Explicit typing is useful when you want to document the contract.

### What does `this` mean?

Inside a component method, `this.count` refers to the count property belonging to that component instance. `this.count()` reads its value; `this.count.set(5)` replaces it. In a template, Angular already provides the component context, so you normally write `count()`.

### Why do arrays and objects need special care?

An array or object is a reference value. Mutating the existing object does not give the signal a new reference. The reliable beginner pattern is to create a new array or object and return it through `update()`. This is called an immutable update: preserve the old value and construct the next one rather than changing the old one in place.


## What problem does this solve?
A component needs to remember changing values such as a counter, selected item, or open/closed state. A signal is a reactive container holding a value that Angular can track. A normal property is still valid; signals are useful when state changes and other reactive values depend on it.

## 1. signal() and WritableSignal
```ts
import { signal, WritableSignal } from '@angular/core';

count = signal(0);
name: WritableSignal<string> = signal('Developer');
```
`signal(0)` creates a writable signal initially holding 0. TypeScript infers `WritableSignal<number>`. Explicit typing is optional. A writable signal can be read and changed.

## 2. Reading with ()
```ts
count = signal(0);
```
```html
<p>Count: {{ count() }}</p>
```
`count()` returns the stored number. In component methods use `this.count()`. The signal container itself is not the number.

## 3. set() — known replacement
```ts
reset() {
  this.count.set(0);
}
```
Whatever the previous value, the new value is 0.

## 4. update() — calculate from the current value
```ts
increment() {
  this.count.update(current => current + 1);
}
```
If the current value is 4, the callback receives 4, returns 5, and the signal stores 5. `current` is an ordinary parameter name. The arrow function is equivalent to:
```ts
current => {
  return current + 1;
}
```
Use set for a known replacement and update when the next value depends on the previous value.

## 5. Complete counter connection
**counter.ts**
```ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.html'
})
export class Counter {
  count = signal(0);

  increment() {
    this.count.update(current => current + 1);
  }

  reset() {
    this.count.set(0);
  }
}
```
**counter.html**
```html
<p>Count: {{ count() }}</p>
<button (click)="increment()">Increase</button>
<button (click)="reset()">Reset</button>
```
Click → method → signal update → template reads the new value.

## 6. Primitive signals
```ts
score = signal(10);
title = signal('Angular');
isOpen = signal(false);

increaseScore() {
  this.score.update(score => score + 5);
}

changeTitle() {
  this.title.set('TypeScript');
}

toggle() {
  this.isOpen.update(open => !open);
}
```
`!` reverses a boolean.

## 7. Array signals and immutable updates
```ts
topics = signal<string[]>(['Components', 'Signals']);
```
`string[]` means an array of strings. Read it with `topics()`.

### Add
```ts
addTopic() {
  this.topics.update(current => [...current, 'Routing']);
}
```
`...current` spreads the existing items into a new array. The new item is appended.

### Remove
```ts
removeTopic(name: string) {
  this.topics.update(current =>
    current.filter(topic => topic !== name)
  );
}
```
`filter()` returns a new array. `!==` means not equal. All matching names are removed.

### Replace
```ts
renameTopic(oldName: string, newName: string) {
  this.topics.update(current =>
    current.map(topic => topic === oldName ? newName : topic)
  );
}
```
`map()` returns a new array. The conditional expression replaces matching items and preserves others.

Avoid `this.topics().push('Routing')`. That mutates the existing array without giving the signal a new reference. Return a new array instead. In real collections, prefer stable IDs to titles for identity.

## 8. Object signals and immutable updates
```ts
interface Profile {
  name: string;
  level: number;
  active: boolean;
}

profile = signal<Profile>({
  name: 'Developer',
  level: 1,
  active: true
});
```
The interface describes the object shape.

### Replace the whole object
```ts
resetProfile() {
  this.profile.set({
    name: 'Developer',
    level: 1,
    active: true
  });
}
```

### Update one property
```ts
increaseLevel() {
  this.profile.update(current => ({
    ...current,
    level: current.level + 1
  }));
}
```
`...current` copies the existing properties. The later level overrides the copied level. Parentheses tell JavaScript that the arrow function returns an object. Avoid `this.profile().level++`, which mutates the stored object.

### Nested objects
A spread is shallow. Copy the nested object you change:
```ts
settings = signal({
  theme: { dark: false },
  language: 'en'
});

enableDarkMode() {
  this.settings.update(current => ({
    ...current,
    theme: {
      ...current.theme,
      dark: true
    }
  }));
}
```

## 9. Property vs signal
| Normal property | Writable signal |
|---|---|
| `title = 'Angular'` | `title = signal('Angular')` |
| Read `title` | Read `title()` |
| Assign `this.title = 'TS'` | Call `this.title.set('TS')` |
| Simple/static data | Reactive state and dependencies |

A value does not need to become a signal merely because it appears in HTML. Static titles and constants can remain normal properties.

## 10. Ownership and mistakes
A writable signal belongs to the component or service that creates it. Do not turn parent-owned input data into writable state merely to modify it. Do not duplicate values that can be calculated. Do not call set on input or computed signals. Avoid direct array/object mutation.

## Quick reference
```ts
value = signal(0);
value();
value.set(10);
value.update(current => current + 1);
items = signal<string[]>([]);
items.update(items => [...items, 'New']);
```

## Retrieval checkpoint
Explain why `count()` is needed; choose set vs update for reset/increment; add and remove an array item without mutation; update an object property; explain when a normal property is sufficient.

**Coverage:** signal(), WritableSignal, reading, set, update, primitives/arrays/objects, immutable updates, property vs signal.

---

These are concept reference notes, not instructions to replace the current Learning Hub code. Work through the retrieval checkpoint before marking the roadmap complete.
