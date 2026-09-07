# Day 13 — `effect()` Practical Implementation

## What We Built

The Angular Learning Hub now remembers the user's Angular topic search after a browser refresh.

```text
User types "comp"
        ↓
searchText signal changes
        ↓
effect() runs
        ↓
"comp" saved to localStorage
        ↓
Browser refresh
        ↓
saved value is read
        ↓
searchText starts as "comp"
```

---

## 1. Import `effect`

```typescript
import {
  Component,
  computed,
  effect,
  output,
  signal
} from '@angular/core';
```

`effect` is imported from Angular core just like `signal` and `computed`.

---

## 2. Start `searchText` From Local Storage

Before:

```typescript
searchText = signal('');
```

Now:

```typescript
searchText = signal(
  localStorage.getItem('angularSearchText') ?? ''
);
```

### What this does

```text
localStorage.getItem('angularSearchText')
→ reads the previously saved search text

?? ''
→ if nothing was previously saved, use an empty string
```

`''` means an **empty string**.

`??` is the **nullish coalescing operator**.

For this implementation, remember:

```text
saved value exists → use saved value
saved value is null → use ''
```

---

## 3. Existing Search Event

The input event continues updating the signal:

```typescript
onSearch(event: Event) {
  this.searchText.set(
    (event.target as HTMLInputElement).value
  );
}
```

Flow:

```text
user types
→ input event
→ event.target
→ input .value
→ searchText.set(...)
```

---

## 4. Existing `computed()` Search

```typescript
filteredAngularTopics = computed(() =>
  this.angularLearningTopics.filter((topic) => {
    return topic.title
      .toLowerCase()
      .includes(this.searchText().toLowerCase());
  }),
);
```

This remains a `computed()` because it **calculates a value**.

```text
searchText
      ↓
computed()
      ↓
filteredAngularTopics
```

---

## 5. Save Search Text With `effect()`

```typescript
saveSearchText = effect(() => {
  localStorage.setItem(
    'angularSearchText',
    this.searchText()
  );
});
```

### What happens

The effect reads:

```typescript
this.searchText()
```

Angular tracks that signal.

When `searchText` changes, the effect runs again.

```text
searchText changes
       ↓
effect()
       ↓
localStorage.setItem(...)
```

---

## 6. `localStorage.setItem()`

```typescript
localStorage.setItem(
  'angularSearchText',
  this.searchText()
);
```

There are two values:

```text
'angularSearchText'
→ fixed storage key/name

this.searchText()
→ dynamic value typed by the user
```

Example:

```text
User types:
comp

Stored:
Key                 Value
angularSearchText   comp
```

The user's value is **not hard-coded**.

---

## 7. Why We Read From Local Storage

If we kept:

```typescript
searchText = signal('');
```

then after refresh:

```text
searchText starts as ""
        ↓
effect runs
        ↓
localStorage gets overwritten with ""
```

Instead we initialize the signal with:

```typescript
localStorage.getItem('angularSearchText') ?? ''
```

Now:

```text
Previously stored: "comp"
        ↓
refresh
        ↓
getItem() returns "comp"
        ↓
searchText starts as "comp"
```

---

## 8. `computed()` vs `effect()` In Our App

### `computed()`

```typescript
filteredAngularTopics = computed(...)
```

Purpose:

```text
CALCULATE the filtered topic list
```

### `effect()`

```typescript
saveSearchText = effect(...)
```

Purpose:

```text
DO something when searchText changes
→ save it to localStorage
```

### Memory Rule

```text
Need a VALUE?
→ computed()

Need to DO something because a signal changed?
→ effect()
```

---

## 9. Complete Code Added Today

```typescript
searchText = signal(
  localStorage.getItem('angularSearchText') ?? ''
);

saveSearchText = effect(() => {
  localStorage.setItem(
    'angularSearchText',
    this.searchText()
  );
});
```

The existing search method remains:

```typescript
onSearch(event: Event) {
  this.searchText.set(
    (event.target as HTMLInputElement).value
  );
}
```

---

# Complete Day 13 Flow

```text
Application starts
      ↓
localStorage.getItem(...)
      ↓
saved search becomes initial searchText
      ↓
computed() calculates filtered topics

User types
      ↓
onSearch($event)
      ↓
searchText.set(...)
      ↓
searchText changes
      ├───────────────┐
      ↓               ↓
computed()          effect()
      ↓               ↓
filter topics       save to localStorage
```

---

# Day 13 Main Learning

```text
signal()
→ stores the search state

computed()
→ calculates filtered topics

effect()
→ reacts to searchText and saves it

localStorage.setItem()
→ saves data in browser storage

localStorage.getItem()
→ reads saved data

?? ''
→ use empty string when no saved value exists
```
