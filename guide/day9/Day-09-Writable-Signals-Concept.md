# Day 9 — Writable Signals

## What is a Signal?

A signal holds a value that Angular can track.

```typescript
selectedTechnology = signal("Angular");
```

```text
selectedTechnology
→ signal

"Angular"
→ initial string value stored in the signal
```

---

# Reading a Signal

A normal property is read directly:

```typescript
selectedTechnology
```

A signal is read using `()`:

```typescript
selectedTechnology()
```

Example:

```typescript
selectedTechnology = signal("Angular");
```

```html
<h2>{{ selectedTechnology() }}</h2>
```

Result:

```text
Angular
```

## Memory Rule

```text
Normal property
selectedTechnology

Signal
selectedTechnology()
```

---

# Why Use a Signal?

A signal is a reactive value that Angular can track.

```text
Signal value changes
        ↓
Angular knows it changed
        ↓
UI that reads the signal can update
```

Example:

```text
"Angular"
    ↓
signal changes
    ↓
"TypeScript"
    ↓
UI updates
```

## Memory Rule

```text
signal()
→ reactive value Angular can track
```

---

# Creating a Writable Signal

Import `signal`:

```typescript
import { signal } from '@angular/core';
```

Create the signal:

```typescript
technology = signal("Angular");
```

```text
technology
→ signal

"Angular"
→ initial value
```

Read it:

```typescript
technology()
```

Result:

```text
"Angular"
```

---

# Changing a Signal with `.set()`

Use `.set()` when you want to replace the current value.

```typescript
technology = signal("Angular");
```

Change it:

```typescript
this.technology.set("C#");
```

Flow:

```text
Before

technology()
→ "Angular"

        ↓

this.technology.set("C#");

        ↓

After

technology()
→ "C#"
```

## Example with a Button

### TypeScript

```typescript
technology = signal("Angular");

changeTechnology() {
  this.technology.set("TypeScript");
}
```

### HTML

```html
<h2>{{ technology() }}</h2>

<button (click)="changeTechnology()">
  Change Technology
</button>
```

Flow:

```text
technology()
→ "Angular"

        ↓

User clicks button

        ↓

changeTechnology()

        ↓

this.technology.set("TypeScript")

        ↓

technology()
→ "TypeScript"

        ↓

UI displays
TypeScript
```

## Memory Rule

```text
.set(newValue)
→ replace the current value
```

---

# Changing a Signal with `.update()`

Use `.update()` when the new value depends on the current value.

Example:

```typescript
count = signal(1);
```

```typescript
this.count.update(current => current + 1);
```

Flow:

```text
count()
→ 1

current
→ 1

current + 1
→ 2

count()
→ 2
```

The `current` parameter represents the signal's current value.

```typescript
current => current + 1
```

means:

```text
take current value
        ↓
change it
        ↓
store the result as the new signal value
```

---

# `.set()` vs `.update()`

```text
.set()
→ replace value

.update()
→ use current value to calculate new value
```

Example:

```typescript
count = signal(1);
```

`.set()`:

```typescript
this.count.set(10);
```

```text
1 → 10
```

`.update()`:

```typescript
this.count.update(current => current + 1);
```

```text
1 → 2
```

---

# Writable Signal

A signal that you create with `signal()` can be changed.

```typescript
technology = signal("Angular");
```

You can:

```typescript
technology()
```

to read it.

You can:

```typescript
this.technology.set("TypeScript");
```

to replace it.

You can:

```typescript
this.count.update(current => current + 1);
```

to update based on the current value.

That is why it is called a **Writable Signal**.

---

# Quick Reference

```typescript
// Create
technology = signal("Angular");

// Read
technology();

// Replace
this.technology.set("TypeScript");

// Update using current value
count.update(current => current + 1);
```

---

# Memory Rules

```text
signal(value)
→ create signal with initial value
```

```text
signalName()
→ read signal value
```

```text
.set(newValue)
→ replace signal value
```

```text
.update(current => ...)
→ use current value to create new value
```

---

# Concept Flow

```text
signal("Angular")
        ↓
initial value
        ↓
technology()
        ↓
read value
        ↓
.set("TypeScript")
        ↓
replace value
        ↓
Angular tracks change
        ↓
UI updates
```

Or:

```text
signal(1)
        ↓
count()
→ 1
        ↓
.update(current => current + 1)
        ↓
count()
→ 2
```
