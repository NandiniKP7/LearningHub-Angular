# Day 10 — Computed Signals

## What is a Computed Signal?

A computed signal creates a value from other signal values.

```typescript
firstName = signal("John");
lastName = signal("Smith");

fullName = computed(() => {
  return this.firstName() + " " + this.lastName();
});
```

```text
firstName → original/source state
lastName  → original/source state
fullName  → computed/derived state
```

## `signal()` vs `computed()`

```text
signal()
→ stores source state

computed()
→ derives/calculates a value from signal state
```

If a value can already be calculated from existing signals, `computed()` avoids maintaining another writable value manually.

## Reading a Computed Signal

Like a signal, read a computed signal using `()`:

```typescript
fullName()
```

HTML:

```html
<p>{{ fullName() }}</p>
```

## Automatic Recalculation

```typescript
firstName = signal("John");
lastName = signal("Smith");

fullName = computed(() => {
  return this.firstName() + " " + this.lastName();
});
```

If:

```typescript
this.firstName.set("David");
```

then:

```text
firstName()
"John" → "David"
        ↓
computed() dependency changed
        ↓
fullName() recalculates
        ↓
"David Smith"
```

You do not manually `.set()` the computed value.

## Number Example

```typescript
price = signal(100);
quantity = signal(3);

total = computed(() => {
  return this.price() * this.quantity();
});
```

```text
price()    → 100
quantity() → 3
        ↓
total() → 300
```

If:

```typescript
this.quantity.set(5);
```

then:

```text
100 × 5
↓
total() → 500
```

## Multiple Dependencies

```typescript
price = signal(100);
quantity = signal(5);
discount = signal(10);

total = computed(() => {
  return (this.price() * this.quantity()) - this.discount();
});
```

```text
price ───────┐
quantity ────┼──→ computed() → total()
discount ────┘
```

If any source signal used by the computation changes, the derived value can recalculate.

## When Should I Use `computed()`?

Ask:

```text
Can this value be calculated from signal values I already have?
```

If yes, `computed()` may be appropriate.

Example:

```typescript
completedTopics = signal(10);
totalTopics = signal(40);

progressPercentage = computed(() => {
  return (this.completedTopics() / this.totalTopics()) * 100;
});
```

```text
10 / 40 × 100
↓
progressPercentage() = 25
```

If:

```typescript
this.completedTopics.set(20);
```

then:

```text
20 / 40 × 100
↓
progressPercentage() = 50
```

## Learning Hub Future Example

Later, the Learning Hub could track completed and total topics and derive progress:

```text
Completed Topics
        +
Total Topics
        ↓
computed()
        ↓
Progress Percentage
```

This is only a future example and does not need to be implemented yet.

## Writable Signal vs Computed Signal

```text
Writable Signal

signal()
→ source state
→ .set()
→ .update()
```

```text
Computed Signal

computed()
→ derived state
→ calculated from other signals
→ read with ()
→ do not manually .set() it
```

## Quick Reference

```typescript
import { computed, signal } from '@angular/core';

price = signal(100);
quantity = signal(3);

total = computed(() => {
  return this.price() * this.quantity();
});
```

HTML:

```html
<p>{{ total() }}</p>
```

## Memory Rules

```text
signal()
→ source/state

computed()
→ derived/calculated state

computedName()
→ read computed value

source signal changes
→ computed value recalculates

computed()
→ do not manually .set() it
```

## Main Idea

```text
You change the SOURCE STATE.

Angular handles the DERIVED STATE.
```
