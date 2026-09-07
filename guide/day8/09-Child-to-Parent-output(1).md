# Child → Parent Communication with `output()`

Child → Parent communication lets a **child component tell its parent that something happened**.

---

# What Problem Does This Solve?

Our reusable `TopicCardComponent` owns the topic button.

When the user clicks a topic:

```text
TopicCardComponent
CHILD
      ↓
user clicks topic
      ↓
AngularTopicsComponent
PARENT
```

The child should report the click.

The parent should decide what happens next.

---

# Where Do We Use This?

```text
Child HTML
→ user action

Child TypeScript
→ output() + emit()

Parent HTML
→ listens to child output

Parent TypeScript
→ handles emitted value
```

---

# Strong Learning Hub Use Case

We already have:

```text
AngularTopicsComponent
PARENT
      ↓
[topic]="topic"
      ↓
TopicCardComponent
CHILD
```

Now we add the reverse direction:

```text
TopicCardComponent
CHILD
      ↓
topicSelected.emit(...)
      ↓
AngularTopicsComponent
PARENT
```

So:

```text
input()
Parent → Child

output()
Child → Parent
```

---

# Complete Child TypeScript

`topic-card.component.ts`

```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-topic-card',
  imports: [],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css',
})
export class TopicCard {

  topic = input.required<string>();

  topicSelected = output<string>();

  selectTopic() {
    this.topicSelected.emit(this.topic());
  }
}
```

Important:

```text
topic
→ data coming IN

topicSelected
→ event going OUT
```

---

# Child HTML

`topic-card.component.html`

```html
<button
  class="topic-card"
  (click)="selectTopic()">

  <span>{{ topic() }}</span>

</button>
```

Flow:

```text
User clicks button
      ↓
(click)="selectTopic()"
      ↓
selectTopic()
      ↓
topicSelected.emit(topic())
```

---

# What Does `output<string>()` Do?

```typescript
topicSelected = output<string>();
```

This creates an output event/channel named:

```text
topicSelected
```

It does **not** store the topic value.

The actual value is sent with:

```typescript
this.topicSelected.emit(this.topic());
```

Think:

```text
topicSelected
→ output channel

emit("Components")
→ send value through channel
```

---

# Parent Listens to the Child

Parent HTML already uses the child:

```html
<app-topic-card
  [topic]="topic">
</app-topic-card>
```

Now add the output listener:

```html
<app-topic-card
  [topic]="topic"
  (topicSelected)="onTopicSelected($event)">
</app-topic-card>
```

This line:

```html
(topicSelected)="onTopicSelected($event)"
```

is the **listening connection**.

Think:

```text
Child output name

topicSelected
      ↕
   MUST MATCH
      ↕
Parent listener

(topicSelected)
```

---

# What Is `$event`?

If the child emits:

```typescript
this.topicSelected.emit(this.topic());
```

and the topic is:

```text
Components
```

then the parent receives:

```text
$event = "Components"
```

So:

```html
(topicSelected)="onTopicSelected($event)"
```

becomes conceptually:

```text
onTopicSelected("Components")
```

---

# Parent TypeScript

`angular-topics.component.ts`

```typescript
onTopicSelected(topic: string) {
  console.log(topic);
}
```

Later the parent can use this value to:

```text
display topic notes
change selected topic
navigate
load topic content
```

For now, the goal is understanding the communication.

---

# Complete Flow

```text
USER
clicks topic button
      ↓
CHILD HTML
(click)="selectTopic()"
      ↓
CHILD TS
selectTopic()
      ↓
topicSelected.emit(topic())
      ↓
OUTPUT
topicSelected
      ↓
PARENT HTML
(topicSelected)="onTopicSelected($event)"
      ↓
$event = emitted topic
      ↓
PARENT TS
onTopicSelected(topic)
```

---

# `input()` vs `output()`

```text
PARENT
   │
   │ [topic]="topic"
   ↓
CHILD
   │
   │ topicSelected.emit(...)
   ↑
PARENT
```

```text
input()
→ Parent → Child
→ DATA IN

output()
→ Child → Parent
→ EVENT OUT
```

---

# Learning Hub Connection

```text
AngularTopicsComponent
PARENT
      ↓
[topic]="topic"
      ↓
TopicCardComponent
CHILD
      ↓
User clicks topic
      ↓
selectTopic()
      ↓
topicSelected.emit(topic())
      ↓
(topicSelected)
      ↓
onTopicSelected($event)
      ↓
AngularTopicsComponent
PARENT
```

---

# Cheat Sheet

### Child `.ts`

```typescript
topic = input.required<string>();

topicSelected = output<string>();

selectTopic() {
  this.topicSelected.emit(this.topic());
}
```

### Child `.html`

```html
<button (click)="selectTopic()">
  {{ topic() }}
</button>
```

### Parent `.html`

```html
<app-topic-card
  [topic]="topic"
  (topicSelected)="onTopicSelected($event)">
</app-topic-card>
```

### Parent `.ts`

```typescript
onTopicSelected(topic: string) {
  console.log(topic);
}
```

### Remember

```text
input()
Parent → Child

output()
Child → Parent

emit(value)
→ child sends value

(topicSelected)
→ parent listens

$event
→ emitted value received by parent
```
