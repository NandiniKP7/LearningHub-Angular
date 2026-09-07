# Parent → Child Communication with `input()`

Parent → Child communication lets a parent component **send data to a reusable child component**.

---

# What Problem Does This Solve?

Our Angular Learning Hub has many topics:

```text
Application Setup & Architecture
String Interpolation
Components
Property Binding
Event Binding
...
```

We do not want separate components such as:

```text
ComponentsCardComponent
PropertyBindingCardComponent
EventBindingCardComponent
...
```

Instead, we can create **one reusable child component**:

```text
TopicCardComponent
```

The parent provides the topic data, while the child provides the reusable HTML and CSS design.

```text
AngularTopicsComponent
PARENT
│
│ owns topics[]
│
│ @for loops through topics
│
├── "Components" ──────────────→ TopicCardComponent
├── "Property Binding" ────────→ TopicCardComponent
├── "Event Binding" ───────────→ TopicCardComponent
│
└── same child component reused
```

---

# Parent vs Child

For this example:

```text
AngularTopicsComponent
        ↓
      PARENT

TopicCardComponent
        ↓
       CHILD
```

Think:

```text
PARENT
What data should be displayed?
        ↓
      input()
        ↓
CHILD
How should that data look?
```

---

# Where Do We Use This?

Three pieces work together:

```text
Parent TypeScript
→ owns the data

Parent HTML
→ sends the data

Child TypeScript
→ receives the data with input()
```

The child HTML/CSS controls how that data is displayed.

---

# Learning Hub Example

## Parent TypeScript

`AngularTopicsComponent` owns the topic list:

```typescript
topics = [
  "Application Setup & Architecture",
  "String Interpolation",
  "Components",
  "Property Binding"
];
```

---

## Parent HTML

The parent loops through the topics:

```html
@for (topic of topics; track topic) {

  <app-topic-card
    [topic]="topic">
  </app-topic-card>

}
```

Important:

```text
[topic]
→ input belonging to the child

topic
→ current value from the parent's @for loop
```

Flow:

```text
topics[]
   ↓
@for
   ↓
current topic
   ↓
[topic]="topic"
   ↓
TopicCardComponent
```

---

# Child Receives the Topic

Inside `TopicCardComponent`:

```typescript
import { Component, input } from '@angular/core';

export class TopicCardComponent {

  topic = input.required<string>();

}
```

This means:

```text
TopicCardComponent expects
the parent to provide a topic
```

---

# Child Displays the Topic

Child HTML:

```html
<button class="topic-card">
  {{ topic() }}
</button>
```

The child does not care whether the value is:

```text
Components
Property Binding
Event Binding
Signals
Forms
```

It simply displays whatever topic the parent sends.

---

# Why `topic()`?

Modern Angular `input()` creates a signal-based input.

So:

```typescript
topic = input.required<string>();
```

is read with:

```typescript
topic()
```

For now remember:

```text
input()
→ receive data from parent

topic()
→ read received value
```

Signals themselves will be covered later.

---

# Complete Flow

```text
AngularTopicsComponent
        PARENT

topics[]
   ↓
@for
   ↓
topic = "Components"
   ↓
[topic]="topic"
   ↓
TopicCardComponent
        CHILD
   ↓
topic = input.required<string>()
   ↓
{{ topic() }}
   ↓

[ Components ]
```

Next loop:

```text
topic = "Property Binding"
   ↓
same TopicCardComponent
   ↓

[ Property Binding ]
```

So:

```text
One child component
One HTML design
One CSS design
Different topic data
```

---

# Default Input

Sometimes an input does not need to be required.

Example:

```typescript
buttonText = input("Open Topic");
```

Here:

```text
"Open Topic"
→ default value
```

If the parent sends another value, the parent's value is used.

Use this when the child can work without the parent providing the value.

---

# Required Input

For our Topic Card:

```typescript
topic = input.required<string>();
```

makes more sense because a topic card should have a topic.

Remember:

```text
input(defaultValue)
→ parent MAY provide value

input.required<Type>()
→ parent MUST provide value
```

---

# Connection to Previous Lesson

Template Control Flow gave us:

```text
topics[]
   ↓
@for
```

Parent → Child adds:

```text
topics[]
   ↓
@for
   ↓
[topic]="topic"
   ↓
TopicCardComponent
   ↓
input()
```

So we can reuse one component for every Angular topic.

---

# Cheat Sheet

### Parent `.ts`

```typescript
topics = [
  "Components",
  "Property Binding"
];
```

### Parent `.html`

```html
@for (topic of topics; track topic) {

  <app-topic-card
    [topic]="topic">
  </app-topic-card>

}
```

### Child `.ts`

```typescript
topic = input.required<string>();
```

### Child `.html`

```html
{{ topic() }}
```

### Remember

```text
Parent
→ owns data

[topic]="topic"
→ sends data

Child input()
→ receives data

topic()
→ reads data

One child
→ reusable for many topics
```
