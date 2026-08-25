# Day 15 — Angular Pipes
## Practical Implementation — Developer Learning Hub

## What We Implemented

Today we used Angular's built-in `titlecase` pipe on the existing Learning Hub topic title.

The goal was to improve how topic titles are displayed without changing the original JSON data.

---

## 1. Before

The topic card displayed the signal directly:

```html
<span class="topic-title">
  {{ learningTopic() }}
</span>
```

Flow:

```text
learningTopic()
→ read the topic title
→ display the original value
```

---

## 2. Import `TitleCasePipe`

In `topic-card.component.ts`:

```typescript
import { TitleCasePipe } from '@angular/common';
```

Because `TopicCard` is using standalone component imports, add the pipe to the component:

```typescript
@Component({
  selector: 'app-topic-card',
  imports: [TitleCasePipe],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css',
})
```

---

## 3. Apply `titlecase` in HTML

Change:

```html
{{ learningTopic() }}
```

to:

```html
{{ learningTopic() | titlecase }}
```

Complete example:

```html
<span class="topic-title">
  {{ learningTopic() | titlecase }}
</span>
```

---

## 4. What Each Part Means

```html
{{ learningTopic() | titlecase }}
```

```text
{{ }}
→ Angular interpolation

learningTopic()
→ reads the signal input value

|
→ passes the value through a pipe

titlecase
→ formats the value using title casing
```

---

## 5. Example

If the value is:

```text
angular signals and state
```

the template can display:

```text
Angular Signals And State
```

The original value itself is not replaced by the pipe.

```text
Original TypeScript / JSON value
→ stays the same

Displayed value
→ formatted by titlecase
```

---

## 6. Why We Did Not Apply `titlecase` to Every Subtopic

Some Learning Hub subtopics contain code-like values such as:

```text
ng new / ng serve
app.config.ts
input()
@Component
```

Applying `titlecase` blindly could make technical/code-like text display incorrectly or inconsistently.

Therefore today's implementation keeps the change focused on the main topic title.

```text
Main topic title
→ titlecase

Subtopics
→ keep original formatting
```

---

## 7. No TypeScript Data Mutation Was Needed

We did not write code such as:

```typescript
this.learningTopic.set(...);
```

A pipe is for display transformation.

```text
value
→ pipe
→ formatted HTML
```

It does not require changing the underlying topic data.

---

## 8. Pipes vs `computed()`

In the Learning Hub:

```typescript
filteredAngularTopics = computed(...)
```

is used to calculate which topics match the search.

```text
searchText
→ computed()
→ filtered topic array
```

The pipe has a different responsibility:

```text
learningTopic()
→ titlecase
→ formatted topic title
```

Memory:

```text
computed()
→ calculate/derive data

pipe
→ format data for display
```

---

# Code Added Today

## `topic-card.component.ts`

```typescript
import { TitleCasePipe } from '@angular/common';
```

and:

```typescript
@Component({
  selector: 'app-topic-card',
  imports: [TitleCasePipe],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css',
})
```

## `topic-card.component.html`

```html
<span class="topic-title">
  {{ learningTopic() | titlecase }}
</span>
```

---

# Complete Day 15 Flow

```text
JSON topic title
      ↓
parent component
      ↓
learningTopic signal input
      ↓
learningTopic()
      ↓
titlecase pipe
      ↓
formatted title displayed in HTML
```

---

# Day 15 Main Learning

```text
Pipe
→ formats a value for display

|
→ applies the pipe

learningTopic()
→ reads the signal

titlecase
→ formats the displayed text

TitleCasePipe
→ imported into the standalone component
```

## Main Memory Rule

```text
{{ learningTopic() | titlecase }}

read signal
→ pipe the value
→ display formatted text

Original JSON value remains unchanged.
```
