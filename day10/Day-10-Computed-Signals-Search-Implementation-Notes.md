# Day 10 — Computed Signals: Search Implementation

## Goal

Add a search box to `AngularTopicsComponent` so the Angular topic list filters based on what the user types.

---

## 1. Search Text Signal

```typescript
searchText = signal('');
```

`searchText` starts empty and stores what the user types into the search box.

```text
searchText()
→ source state
```

---

## 2. Search Box

```html
<input
  type="text"
  placeholder="Search Angular Topics"
  [value]="searchText()"
  (input)="onSearch($event)"
>
```

### What each part does

```text
type="text"
→ creates a textbox

placeholder="Search Angular Topics"
→ displays a hint inside the empty textbox

[value]="searchText()"
→ property binding
→ passes the current searchText signal value to the textbox

(input)="onSearch($event)"
→ when the user types, call onSearch()
→ $event contains information from the textbox
```

---

## 3. Store What the User Typed

```typescript
onSearch(event: Event) {
  this.searchText.set(
    (event.target as HTMLInputElement).value
  );
}
```

```text
event.target
→ the textbox

.value
→ what the user typed

searchText.set(...)
→ stores that value in the signal
```

Example:

```text
User types "signal"
        ↓
onSearch($event)
        ↓
event.target.value
→ "signal"
        ↓
searchText.set("signal")
        ↓
searchText()
→ "signal"
```

---

## 4. Computed Filtered List

The original topic list stays as a normal array:

```typescript
angularLearningTopics = [
  "Angular Application Setup & Architecture",
  "String Interpolation",
  "Components",
  ...
];
```

Create a computed signal from the topic list and `searchText`:

```typescript
filteredAngularTopics = computed(() =>
  this.angularLearningTopics.filter((topic) => {
    return topic
      .toLowerCase()
      .includes(this.searchText().toLowerCase());
  })
);
```

```text
angularLearningTopics
        +
searchText()
        ↓
computed()
        ↓
filteredAngularTopics()
```

`filteredAngularTopics` is derived state. We do not manually `.set()` it.

---

## 5. Why `toLowerCase()`?

Both values are converted to lowercase:

```typescript
topic.toLowerCase()
this.searchText().toLowerCase()
```

This allows searches such as:

```text
SIGNAL
signal
Signal
```

to match topics containing `Signals`.

---

## 6. Display the Computed List

Previously:

```html
@for (
  angularLearningTopic of angularLearningTopics;
  track angularLearningTopic;
  let i = $index
) {
```

Now:

```html
@for (
  angularLearningTopic of filteredAngularTopics();
  track angularLearningTopic;
  let i = $index
) {
```

Why `()`?

```text
filteredAngularTopics
→ computed signal

filteredAngularTopics()
→ reads its current value
```

The existing `TopicCardComponent` stays the same:

```html
<app-topic-card
  [learningTopic]="angularLearningTopic"
  (selectedLearningTopic)="onTopicSelected($event)">
</app-topic-card>
```

---

## 7. Initial Behavior

Initially:

```typescript
searchText = signal('');
```

So:

```text
searchText() = ""
        ↓
filter runs
        ↓
filteredAngularTopics()
        ↓
all Angular topics are displayed
```

After the user searches:

```text
searchText() = "signal"
        ↓
computed() recalculates
        ↓
filteredAngularTopics()
        ↓
only matching topics are displayed
```

---

## Complete Search Flow

```text
User types in search box
        ↓
(input)
        ↓
onSearch($event)
        ↓
searchText.set(...)
        ↓
searchText changes
        ↓
computed() recalculates
        ↓
filteredAngularTopics()
        ↓
@for
        ↓
matching TopicCard components are displayed
```

---

## What Computed Signals Did in Our App

```text
searchText
→ writable/source signal

filteredAngularTopics
→ computed/derived signal
```

We change:

```typescript
searchText.set(...)
```

We only read:

```typescript
filteredAngularTopics()
```

### Main Memory Rule

```text
signal()
→ stores state

computed()
→ derives a value from signal state
```

In our Learning Hub:

```text
searchText
→ what the user typed

filteredAngularTopics
→ topic list calculated from that search text
```
