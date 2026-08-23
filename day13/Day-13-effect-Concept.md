# Day 13 — `effect()` Concept

## What Problem Does `effect()` Solve?

Sometimes a signal changes and we want Angular to **automatically perform an action** because of that change.

Example:

```typescript
searchText = signal('');
```

When `searchText` changes, we may want to:

```text
log the new value
save/synchronize something
work with something outside signal state
```

That is where `effect()` is used.

---

## Basic Syntax

```typescript
effect(() => {
  console.log(this.searchText());
});
```

Flow:

```text
searchText changes
        ↓
effect() notices the signal it reads
        ↓
effect runs automatically
        ↓
console.log(...)
```

---

## How Does `effect()` Know What to Watch?

Inside:

```typescript
effect(() => {
  console.log(this.searchText());
});
```

we read:

```typescript
this.searchText()
```

Angular tracks that signal automatically.

If the signal changes:

```typescript
this.searchText.set('Signals');
```

the effect runs again.

---

## `computed()` vs `effect()`

You already used `computed()` for your topic search.

```text
searchText()
     ↓
computed()
     ↓
filteredAngularTopics()
```

`computed()` creates a **calculated value**.

`effect()` performs an **action**:

```text
signal changes
     ↓
effect()
     ↓
do something
```

### Memory Rule

```text
computed()
→ CALCULATE something

effect()
→ DO something because a signal changed
```

---

## Multiple Signals

```typescript
firstName = signal('John');
lastName = signal('Smith');

effect(() => {
  console.log(
    this.firstName(),
    this.lastName()
  );
});
```

The effect reads both signals, so changing either one can cause the effect to run again.

---

## Side Effect

The action performed by `effect()` is called a **side effect**.

Examples:

```text
console logging
saving/synchronizing data
working with browser APIs
working with something outside Angular signal state
```

---

## When NOT to Use `effect()`

Do not use `effect()` just to calculate another value from signals.

For example:

```text
searchText
→ filtered topic list
```

should use:

```typescript
computed()
```

because the filtered list is **derived data**.

---

## Cleanup — Basic Idea

Some effects may start external work that needs to be stopped later.

For now, remember only:

```text
effect starts external work
        ↓
sometimes that work needs cleanup
```

We will learn the syntax when we have a real implementation that needs it.

---

## Learning Hub Connection

Your Learning Hub already has signals such as:

```typescript
searchText = signal('');
```

and:

```typescript
isExpandable = signal(false);
```

Today we will look for a **real side effect** that improves the Learning Hub.

We will NOT replace your existing `computed()` search logic with `effect()`.

---

# Quick Cheat Sheet

```typescript
effect(() => {
  console.log(this.searchText());
});
```

```text
signal read inside effect
        ↓
signal changes
        ↓
effect runs again
```

```text
signal()
→ stores state

computed()
→ derives/calculates state

effect()
→ performs an action when signal dependencies change
```

# Day 13 Main Memory Rule

```text
Need a VALUE?
→ computed()

Need to DO something because a signal changed?
→ effect()
```
