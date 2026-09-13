# 13. Signal-Based State Changes

## Subtopics
- event → signal update
- `set()` vs `update()`
- toggle / counter
- array add / remove
- object updates
- selected state
- minimal state
- derived state

## What it solves

This topic connects concepts you already know:

```text
User event
   ↓
component method
   ↓
signal changes
   ↓
template updates
```

## Where do we use this?

| File | Job |
|---|---|
| Component `.html` | User event + display |
| Component `.ts` | Signal and update method |

## Toggle example

```ts
isOpen = signal(false);

toggle() {
  this.isOpen.update(open => !open);
}
```

```html
<button (click)="toggle()">Toggle</button>

@if (isOpen()) {
  <p>Details are visible.</p>
}
```

## `set()` vs `update()`

```ts
reset() {
  this.count.set(0);
}

increment() {
  this.count.update(count => count + 1);
}
```

Use:

```text
set    → known replacement
update → depends on current value
```

## Array add/remove/update

```ts
tasks = signal<Task[]>([]);
```

Add:

```ts
this.tasks.update(tasks => [
  ...tasks,
  newTask
]);
```

Remove:

```ts
this.tasks.update(tasks =>
  tasks.filter(task => task.id !== id)
);
```

Update one:

```ts
this.tasks.update(tasks =>
  tasks.map(task =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  )
);
```

Prefer stable IDs for finding items.

## Object update

```ts
profile = signal({
  name: 'Developer',
  level: 1
});

rename(name: string) {
  this.profile.update(profile => ({
    ...profile,
    name
  }));
}
```

## Selected state

Usually store a small stable value:

```ts
selectedTaskId = signal<number | null>(null);
```

Then derive the selected object:

```ts
selectedTask = computed(() =>
  this.tasks().find(
    task => task.id === this.selectedTaskId()
  ) ?? null
);
```

## Minimal state

Prefer:

```text
tasks
selectedTaskId
```

Then compute:

```text
selectedTask
completedCount
remainingCount
```

Do not store several writable copies of information that can be derived.

## Local vs shared state

```text
Only one component needs it
→ local component signal

Several unrelated components need it
→ shared service may own it
```

## Common mistakes
- Mutating arrays/objects directly.
- Storing duplicate derived values.
- Using display text as identity instead of a stable ID.
- Adding shared state before deciding who should own it.

## Quick reference

```ts
flag.update(value => !value);
count.update(value => value + 1);
items.update(items => [...items, newItem]);
items.update(items => items.filter(item => item.id !== id));
```

## Memory rule

**Event → method → update source signal → derive what can be calculated.**
