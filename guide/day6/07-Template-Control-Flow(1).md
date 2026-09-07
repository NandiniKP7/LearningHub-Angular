# Angular Template Control Flow

Template Control Flow lets Angular decide **what HTML should appear**.

This solves questions like:

```text
How do I show Angular topics
only when Angular is selected?
```

---

# Where Do We Use Template Control Flow?

Template Control Flow is written inside the component's **HTML template**.

```text
TypeScript (.ts)
→ stores and changes the data

HTML (.html)
→ uses @if, @for, @switch
→ decides what UI should appear
```

## Example

### TypeScript

```typescript
selectedTopic = "";

angularTopics() {
  this.selectedTopic = "Angular";
}
```

### HTML

```html
@if (selectedTopic === "Angular") {
  <app-angular-topics></app-angular-topics>
}
```

## Flow

```text
User clicks Angular
        ↓
angularTopics()
        ↓
selectedTopic = "Angular"
        ↓
HTML checks @if
        ↓
condition is true
        ↓
AngularTopicsComponent appears
```

So remember:

```text
TypeScript
→ What is the current value/state?

HTML Control Flow
→ Based on that value, what should appear?
```

---

# `@if`

Use `@if` when HTML should appear only when a condition is true.

```html
@if (selectedTopic === "Angular") {
  <p>Angular selected</p>
}
```

If:

```text
selectedTopic = "Angular"
```

the paragraph appears.

If the condition is false, it does not appear.

---

# `@else`

Use `@else` when you want fallback content.

```html
@if (selectedTopic === "Angular") {
  <p>Angular selected</p>
} @else {
  <p>Select a technology</p>
}
```

```text
@if true
→ show Angular selected

@if false
→ show Select a technology
```

---

# `@else if`

Use `@else if` when there are multiple conditions.

```html
@if (selectedTopic === "Angular") {
  <p>Angular</p>
} @else if (selectedTopic === "TypeScript") {
  <p>TypeScript</p>
} @else {
  <p>C#</p>
}
```

---

# `@for`

Use `@for` to display items from an array.

### TypeScript

```typescript
topics = [
  "Architecture",
  "Interpolation",
  "Components"
];
```

### HTML

```html
@for (topic of topics; track topic) {
  <p>{{ topic }}</p>
}
```

Flow:

```text
topics array
      ↓
@for
      ↓
one HTML element for each topic
```

---

# `track`

Inside `@for`:

```html
track topic
```

helps Angular identify each item in the list.

Example:

```html
@for (topic of topics; track topic) {
  <p>{{ topic }}</p>
}
```

For now remember:

```text
@for
→ loops through the list

track
→ helps Angular identify each item
```

---

# `@empty`

Use `@empty` when the array has no items.

```html
@for (topic of topics; track topic) {
  <p>{{ topic }}</p>
} @empty {
  <p>No topics available.</p>
}
```

```text
topics has items
→ @for content

topics is empty
→ @empty content
```

---

# `@switch`

Use `@switch` when one value can have several possible choices.

```html
@switch (selectedTopic) {

  @case ("Angular") {
    <p>Angular Topics</p>
  }

  @case ("TypeScript") {
    <p>TypeScript Topics</p>
  }

  @default {
    <p>Select a technology</p>
  }
}
```

Flow:

```text
selectedTopic
      ↓
@switch
      ↓
matching @case
      ↓
display that HTML
```

---

# When to Use What

```text
@if
→ show something based on a condition

@else
→ show fallback content

@else if
→ check another condition

@for
→ display items from a list

track
→ identify each list item

@empty
→ display something when the list is empty

@switch
→ check one value against several choices

@case
→ one possible switch value

@default
→ fallback when no case matches
```

---

# Learning Hub Connection

Our Learning Hub has:

```text
[Angular] [TypeScript] [C#]
```

Eventually we want:

```text
Click Angular
      ↓
selectedTopic = "Angular"
      ↓
@if / @switch
      ↓
show Angular content only
```

Template Control Flow gives us the missing piece between:

```text
User selects something
```

and:

```text
Show the correct content
```

---

# Cheat Sheet

```html
@if (condition) {
  ...
}
```

```html
@if (condition) {
  ...
} @else {
  ...
}
```

```html
@for (item of items; track item) {
  ...
}
```

```html
@switch (value) {
  @case ("A") {
    ...
  }

  @default {
    ...
  }
}
```

Remember:

```text
.ts
→ stores/changes state

.html
→ @if / @for / @switch
→ controls what UI appears
```
