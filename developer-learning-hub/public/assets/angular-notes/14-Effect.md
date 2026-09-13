# 14. `effect()`

## Subtopics
- `effect()`
- dependency tracking
- side effects
- logging / external synchronization
- cleanup basics
- computed vs effect
- when not to use effect

## What it solves

A computed signal **returns a value**.

An effect **performs an action** when tracked signals change.

Example:

```text
searchText changes
      ↓
save value to localStorage
```

## Where do we use this?

Usually in component `.ts` or service `.ts`.

Use effects for work outside normal derived state.

## Basic syntax

```ts
import { effect, signal } from '@angular/core';

theme = signal('light');

logTheme = effect(() => {
  console.log('Theme:', this.theme());
});
```

The effect reads `theme()`, so Angular tracks it.

## Dependency tracking

```ts
firstName = signal('Ada');
lastName = signal('Lovelace');

logName = effect(() => {
  console.log(
    this.firstName(),
    this.lastName()
  );
});
```

Both signals are dependencies.

## Good use: external synchronization

```ts
searchText = signal(
  localStorage.getItem('searchText') ?? ''
);

saveSearchText = effect(() => {
  localStorage.setItem(
    'searchText',
    this.searchText()
  );
});
```

The signal is app state. `localStorage` is outside Angular's reactive state, so synchronization is a reasonable effect.

## `computed()` vs `effect()`

```text
Need a value?
→ computed()

Need an external action?
→ effect()
```

Example:

```ts
total = computed(() =>
  this.price() * this.quantity()
);
```

Do not create a writable `total` and use an effect just to copy the calculation.

## Cleanup

Some effects start work that must be stopped.

```ts
searchEffect = effect(onCleanup => {
  const timer = setTimeout(() => {
    console.log(this.query());
  }, 300);

  onCleanup(() => {
    clearTimeout(timer);
  });
});
```

Cleanup runs before the effect reruns or is destroyed.

## When not to use effect
- To calculate derived state.
- To copy one signal into another.
- When a normal event handler is simpler.
- To create chains of state updates that are hard to follow.

## Common mistakes
- Using effects everywhere just because a value changes.
- Forgetting that effects track signals they read.
- Using an effect where `computed()` is the real solution.
- Forgetting cleanup for timers or similar external work.

## Quick reference

```ts
save = effect(() => {
  localStorage.setItem(
    'key',
    this.value()
  );
});
```

## Memory rule

**Need a calculated value → `computed()`. Need an external action → `effect()`.**
