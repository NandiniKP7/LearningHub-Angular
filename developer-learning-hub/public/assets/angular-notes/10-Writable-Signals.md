# 10. Writable Signals

## Subtopics
- `signal()`
- `WritableSignal`
- reading with `()`
- `set()`
- `update()`
- primitive / array / object signals
- immutable updates
- property vs signal

## What it solves

A writable signal stores **reactive state that this component or service owns**.

When the signal changes, Angular can update places that read it.

## Where do we use this?

Usually in a component `.ts` or service `.ts`.

Templates read signals with `()`.

## Create and read a signal

```ts
import { signal } from '@angular/core';

count = signal(0);
```

Read in TypeScript:

```ts
this.count()
```

Read in HTML:

```html
<p>{{ count() }}</p>
```

## `set()` vs `update()`

Use `set()` when you already know the new value:

```ts
reset() {
  this.count.set(0);
}
```

Use `update()` when the new value depends on the current value:

```ts
increment() {
  this.count.update(current => current + 1);
}
```

## Complete counter

```ts
count = signal(0);

increment() {
  this.count.update(count => count + 1);
}

reset() {
  this.count.set(0);
}
```

```html
<p>Count: {{ count() }}</p>

<button (click)="increment()">Increase</button>
<button (click)="reset()">Reset</button>
```

## Primitive signals

```ts
title = signal('Angular');
isOpen = signal(false);

toggle() {
  this.isOpen.update(open => !open);
}
```

## Array signals

```ts
topics = signal<string[]>([
  'Components',
  'Signals'
]);
```

Add:

```ts
this.topics.update(items => [
  ...items,
  'Routing'
]);
```

Remove:

```ts
this.topics.update(items =>
  items.filter(item => item !== 'Routing')
);
```

Return a new array instead of mutating the existing one with `push()` or `splice()`.

## Object signals

```ts
profile = signal({
  name: 'Developer',
  level: 1
});
```

Update one field:

```ts
this.profile.update(current => ({
  ...current,
  level: current.level + 1
}));
```

## Normal property vs signal

```text
Normal property
title = 'Angular'
→ simple value

Writable signal
title = signal('Angular')
→ reactive state we expect to change
```

Not every value needs to be a signal.

## Common mistakes
- Forgetting `()` when reading a signal.
- Using `set()` when the next value depends on the old value.
- Mutating an array/object directly.
- Turning static values into signals without a reason.

## Quick reference

```ts
value = signal(0);

value();
value.set(10);
value.update(current => current + 1);
```

## Memory rule

**`signal()` stores state → `()` reads → `set()` replaces → `update()` calculates from current value.**
